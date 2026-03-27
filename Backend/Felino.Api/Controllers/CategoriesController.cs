using System.ComponentModel.DataAnnotations;
using Felino.Api.Data;
using Felino.Api.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Felino.Api.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoriesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryResponseDto>>> GetCategories([FromQuery] string? slug)
        {
            IQueryable<Category> query = _context.Categories
                .Include(c => c.Products)
                .AsNoTracking();

            if (!string.IsNullOrWhiteSpace(slug))
            {
                string normalizedSlug = NormalizeSlug(slug);

                var filteredCategories = await query
                    .Where(c => c.Slug == normalizedSlug)
                    .Select(c => MapCategoryToResponse(c))
                    .ToListAsync();

                return Ok(filteredCategories);
            }

            var categories = await query
                .Select(c => MapCategoryToResponse(c))
                .ToListAsync();

            return Ok(categories);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<CategoryResponseDto>> GetCategoryById(int id)
        {
            var category = await _context.Categories
                .Include(c => c.Products)
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category is null)
            {
                return NotFound();
            }

            return Ok(MapCategoryToResponse(category));
        }

        [HttpPost]
        public async Task<ActionResult<CategoryResponseDto>> CreateCategory([FromBody] CreateCategoryDto dto)
        {
            string normalizedSlug = NormalizeSlug(dto.Slug);

            bool slugExists = await _context.Categories
                .AnyAsync(c => c.Slug == normalizedSlug);

            if (slugExists)
            {
                ModelState.AddModelError(nameof(dto.Slug), "Slug används redan.");
                return ValidationProblem(ModelState);
            }

            var category = new Category
            {
                Name = dto.Name.Trim(),
                Slug = normalizedSlug,
                Description = dto.Description.Trim(),
                ImageUrl = string.IsNullOrWhiteSpace(dto.ImageUrl)
                    ? null
                    : dto.ImageUrl.Trim()
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            var response = new CategoryResponseDto
            {
                Id = category.Id,
                Name = category.Name,
                Slug = category.Slug,
                Description = category.Description,
                ImageUrl = category.ImageUrl,
                Products = new List<ProductListItemDto>()
            };

            return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, response);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category is null)
            {
                return NotFound();
            }

            if (category.Products.Any())
            {
                return BadRequest(new
                {
                    message = "Kategorin kan inte tas bort eftersom den har kopplade produkter."
                });
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private static CategoryResponseDto MapCategoryToResponse(Category category)
        {
            return new CategoryResponseDto
            {
                Id = category.Id,
                Name = category.Name,
                Slug = category.Slug,
                Description = category.Description,
                ImageUrl = category.ImageUrl,
                Products = category.Products.Select(p => new ProductListItemDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Slug = p.Slug,
                    Ingredients = p.Ingredients,
                    Price = p.Price,
                    Sauce = p.Sauce,
                    AltText = p.AltText,
                    ImageUrl = p.ImageUrl,
                    CategoryId = p.CategoryId
                }).ToList()
            };
        }

        private static string NormalizeSlug(string value)
        {
            return value
                .Trim()
                .ToLower()
                .Replace("å", "a")
                .Replace("ä", "a")
                .Replace("ö", "o")
                .Replace(" ", "-");
        }
    }

    public class CreateCategoryDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(120)]
        public string Slug { get; set; } = string.Empty;

        [Required]
        [MaxLength(300)]
        public string Description { get; set; } = string.Empty;

        [MaxLength(300)]
        public string? ImageUrl { get; set; }
    }

    public class CategoryResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public List<ProductListItemDto> Products { get; set; } = new();
    }

    public class ProductListItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Ingredients { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string? Sauce { get; set; }
        public string? AltText { get; set; }
        public string? ImageUrl { get; set; }
        public int CategoryId { get; set; }
    }
}