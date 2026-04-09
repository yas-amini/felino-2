using Felino.Api.Data;
using Felino.Api.Domain.Entities;
using Felino.Api.Dtos.Categories;
using Felino.Api.Helpers;
using Felino.Api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
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
        [ProducesResponseType(typeof(IEnumerable<CategoryDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories([FromQuery] string? slug)
        {
            IQueryable<Category> query = _context.Categories
                .Include(c => c.Products)
                .AsNoTracking();

            if (!string.IsNullOrWhiteSpace(slug))
            {
                string normalizedSlug = SlugHelper.Normalize(slug);

                var filteredCategories = await query
                    .Where(c => c.Slug == normalizedSlug)
                    .ToListAsync();

                return Ok(filteredCategories.Select(c => c.ToDto()));
            }

            var categories = await query.ToListAsync();

            return Ok(categories.Select(c => c.ToDto()));
        }

        [HttpGet("featured-preview")]
        [ProducesResponseType(typeof(IEnumerable<MenuPreviewCategoryDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<MenuPreviewCategoryDto>>> GetFeaturedPreview(
            [FromQuery] int takePerCategory = 5)
        {
            if (takePerCategory < 1)
                takePerCategory = 1;

            if (takePerCategory > 5)
                takePerCategory = 5;

            var categories = await _context.Categories
                .Include(c => c.Products)
                .AsNoTracking()
                .ToListAsync();

            var orderStats = await _context.OrderItems
                .Where(oi => oi.ProductId != null)
                .GroupBy(oi => oi.ProductId)
                .Select(g => new
                {
                    ProductId = g.Key!.Value,
                    TotalSold = g.Sum(x => x.Quantity)
                })
                .ToListAsync();

            var statsLookup = orderStats.ToDictionary(x => x.ProductId, x => x.TotalSold);
            var random = new Random();

            var result = categories
                .Select(category =>
                {
                    var productsWithStats = category.Products
                        .Select(p => new
                        {
                            p.Id,
                            p.Name,
                            p.Price,
                            TotalSold = statsLookup.GetValueOrDefault(p.Id, 0)
                        })
                        .ToList();

                    var featured = productsWithStats
                        .Where(p => p.TotalSold > 0)
                        .OrderByDescending(p => p.TotalSold)
                        .Take(takePerCategory)
                        .ToList();

                    if (featured.Count < takePerCategory)
                    {
                        var missing = takePerCategory - featured.Count;

                        var fallback = productsWithStats
                            .Where(p => featured.All(fp => fp.Id != p.Id))
                            .OrderBy(_ => random.Next())
                            .Take(missing)
                            .ToList();

                        featured.AddRange(fallback);
                    }

                    return new MenuPreviewCategoryDto
                    {
                        Title = category.Name,
                        Items = featured
                            .Take(takePerCategory)
                            .Select(p => new MenuPreviewItemDto
                            {
                                Id = p.Id,
                                Name = p.Name,
                                Price = p.Price
                            })
                            .ToList()
                    };
                })
                .Where(c => c.Items.Count >= 1)
                .ToList();

            return Ok(result);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(CategoryDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CategoryDto>> GetCategoryById(int id)
        {
            var category = await _context.Categories
                .Include(c => c.Products)
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
                return NotFound();

            return Ok(category.ToDto());
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(CategoryDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<CategoryDto>> CreateCategory([FromBody] CreateCategoryDto dto)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            if (string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest();

            string slug = string.IsNullOrWhiteSpace(dto.Slug)
                ? SlugHelper.Normalize(dto.Name)
                : SlugHelper.Normalize(dto.Slug);

            bool slugExists = await _context.Categories.AnyAsync(c => c.Slug == slug);
            if (slugExists)
            {
                ModelState.AddModelError(nameof(dto.Slug), "Slug används redan.");
                return ValidationProblem(ModelState);
            }

            var category = new Category
            {
                Name = dto.Name.Trim(),
                Slug = slug,
                Description = dto.Description.Trim(),
                ImageUrl = string.IsNullOrWhiteSpace(dto.ImageUrl)
                    ? null
                    : dto.ImageUrl.Trim()
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, category.ToDto());
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch("{id:int}")]
        [Consumes("application/json-patch+json")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> PatchCategory(
            int id,
            [FromBody] JsonPatchDocument<UpdateCategoryDto> patchDoc)
        {
            if (patchDoc == null)
                return BadRequest();

            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if (category == null)
                return NotFound();

            var categoryToPatch = new UpdateCategoryDto
            {
                Name = category.Name,
                Slug = category.Slug,
                Description = category.Description,
                ImageUrl = category.ImageUrl
            };

            patchDoc.ApplyTo(categoryToPatch, ModelState);

            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            if (!TryValidateModel(categoryToPatch))
                return ValidationProblem(ModelState);

            if (string.IsNullOrWhiteSpace(categoryToPatch.Name))
                return BadRequest();

            string normalizedSlug = string.IsNullOrWhiteSpace(categoryToPatch.Slug)
                ? SlugHelper.Normalize(categoryToPatch.Name)
                : SlugHelper.Normalize(categoryToPatch.Slug);

            bool slugExists = await _context.Categories
                .AnyAsync(c => c.Id != id && c.Slug == normalizedSlug);

            if (slugExists)
            {
                ModelState.AddModelError(nameof(categoryToPatch.Slug), "Slug används redan.");
                return ValidationProblem(ModelState);
            }

            category.Name = categoryToPatch.Name.Trim();
            category.Slug = normalizedSlug;
            category.Description = categoryToPatch.Description.Trim();
            category.ImageUrl = string.IsNullOrWhiteSpace(categoryToPatch.ImageUrl)
                ? null
                : categoryToPatch.ImageUrl.Trim();

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
                return NotFound();

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

        [Authorize(Roles = "Admin")]
        [HttpDelete("{categoryId:int}/products/{productId:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> RemoveProductFromCategory(int categoryId, int productId)
        {
            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == productId && p.CategoryId == categoryId);

            if (product == null)
                return NotFound();

            product.CategoryId = null;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}