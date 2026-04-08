using System.Text.Json;
using Felino.Api.Data;
using Felino.Api.Dtos.Products;
using Felino.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Felino.Api.Services.Implementations
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FeaturedProductDto>> GetFeaturedProductsAsync(int take = 6)
        {
            if (take <= 0)
            {
                return Enumerable.Empty<FeaturedProductDto>();
            }

            var excludedCategoryNames = new[] { "Dryck", "Tillbehör" };

            var popularProducts = await _context.OrderItems
                .Where(oi => oi.ProductId != null)
                .Where(oi => oi.Product != null)
                .Where(oi =>
                    oi.Product!.Category == null ||
                    !excludedCategoryNames.Contains(oi.Product.Category.Name))
                .GroupBy(oi => oi.ProductId)
                .Select(group => new
                {
                    ProductId = group.Key!.Value,
                    TotalSold = group.Sum(x => x.Quantity)
                })
                .OrderByDescending(x => x.TotalSold)
                .Take(take)
                .ToListAsync();

            var popularProductIds = popularProducts
                .Select(x => x.ProductId)
                .ToList();

            var popularProductsWithDetails = await _context.Products
                .Where(p => popularProductIds.Contains(p.Id))
                .Where(p =>
                    p.Category == null ||
                    !excludedCategoryNames.Contains(p.Category.Name))
                .Select(p => new FeaturedProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Slug = p.Slug,
                    Ingredients = CleanIngredients(p.Ingredients),
                    Price = p.Price,
                    Sauce = p.Sauce,
                    AltText = p.AltText,
                    ImageUrl = p.ImageUrl,
                    CategoryId = p.CategoryId,
                    TotalSold = 0,
                    IsFallback = false
                })
                .ToListAsync();

            var popularResult = popularProducts
                .Join(
                    popularProductsWithDetails,
                    stats => stats.ProductId,
                    product => product.Id,
                    (stats, product) =>
                    {
                        product.TotalSold = stats.TotalSold;
                        product.IsFallback = false;
                        return product;
                    })
                .OrderByDescending(x => x.TotalSold)
                .ToList();

            if (popularResult.Count >= take)
            {
                return popularResult;
            }

            var missingCount = take - popularResult.Count;
            var usedIds = popularResult.Select(x => x.Id).ToList();

            var fallbackCandidates = await _context.Products
                .Where(p => !usedIds.Contains(p.Id))
                .Where(p =>
                    p.Category == null ||
                    !excludedCategoryNames.Contains(p.Category.Name))
                .Select(p => new FeaturedProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Slug = p.Slug,
                    Ingredients = CleanIngredients(p.Ingredients),
                    Price = p.Price,
                    Sauce = p.Sauce,
                    AltText = p.AltText,
                    ImageUrl = p.ImageUrl,
                    CategoryId = p.CategoryId,
                    TotalSold = 0,
                    IsFallback = true
                })
                .ToListAsync();

            var random = new Random();

            var fallbackProducts = fallbackCandidates
                .OrderBy(_ => random.Next())
                .Take(missingCount)
                .ToList();

            return popularResult.Concat(fallbackProducts);
        }

        private static string CleanIngredients(string ingredients)
        {
            if (string.IsNullOrWhiteSpace(ingredients))
            {
                return string.Empty;
            }

            ingredients = ingredients.Trim();

            try
            {
                if (ingredients.StartsWith("[") && ingredients.EndsWith("]"))
                {
                    var parsed = JsonSerializer.Deserialize<List<string>>(ingredients);

                    if (parsed != null && parsed.Count > 0)
                    {
                        return string.Join(", ", parsed);
                    }
                }
            }
            catch
            {
                
            }

            return ingredients
                .Replace("[", "")
                .Replace("]", "")
                .Replace("\"", "");
        }
    }
}