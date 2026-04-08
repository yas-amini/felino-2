using Felino.Api.Data;
using Felino.Api.Domain.Entities;
using Felino.Api.Dtos.Products;
using Felino.Api.Helpers;
using Felino.Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Felino.Api.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IProductService _productService;

        public ProductsController(AppDbContext context, IProductService productService)
        {
            _context = context;
            _productService = productService;
        }

        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(typeof(IEnumerable<ProductDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? slug = null)
        {
            if (!string.IsNullOrWhiteSpace(slug))
            {
                var normalizedSlug = SlugHelper.Normalize(slug);

                var productsBySlug = await _context.Products
                    .AsNoTracking()
                    .Where(p => p.Slug == normalizedSlug)
                    .ToListAsync();

                return Ok(productsBySlug.Select(MapToDto));
            }

            if (page < 1)
                page = 1;

            if (pageSize < 1)
                pageSize = 10;

            var products = await _context.Products
                .AsNoTracking()
                .OrderBy(p => p.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(products.Select(MapToDto));
        }

        [HttpGet("featured")]
        [AllowAnonymous]
        [Produces("application/json")]
        [ProducesResponseType(typeof(IEnumerable<FeaturedProductDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<FeaturedProductDto>>> GetFeaturedProducts(
            [FromQuery] int take = 6)
        {
            if (take < 1)
                take = 6;

            var result = await _productService.GetFeaturedProductsAsync(take);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var product = await _context.Products
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return NotFound();

            return Ok(MapToDto(product));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ProductDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] CreateProductDto dto)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            if (string.IsNullOrWhiteSpace(dto.Name))
            {
                ModelState.AddModelError(nameof(dto.Name), "Namn är obligatoriskt.");
                return ValidationProblem(ModelState);
            }

            if (string.IsNullOrWhiteSpace(dto.Ingredients))
            {
                ModelState.AddModelError(nameof(dto.Ingredients), "Ingredienser är obligatoriskt.");
                return ValidationProblem(ModelState);
            }

            var slug = SlugHelper.Normalize(dto.Name);

            if (string.IsNullOrWhiteSpace(slug))
            {
                ModelState.AddModelError(nameof(dto.Name), "Ogiltigt namn för att skapa slug.");
                return ValidationProblem(ModelState);
            }

            var slugExists = await _context.Products.AnyAsync(p => p.Slug == slug);
            if (slugExists)
            {
                ModelState.AddModelError(nameof(dto.Name), "En produkt med samma slug finns redan.");
                return ValidationProblem(ModelState);
            }

            var categoryExists = await _context.Categories.AnyAsync(c => c.Id == dto.CategoryId);
            if (!categoryExists)
            {
                ModelState.AddModelError(nameof(dto.CategoryId), "Den angivna kategorin finns inte.");
                return ValidationProblem(ModelState);
            }

            var product = new Product
            {
                Name = dto.Name.Trim(),
                Slug = slug,
                Ingredients = IngredientsHelper.Normalize(dto.Ingredients),
                Price = dto.Price,
                Sauce = string.IsNullOrWhiteSpace(dto.Sauce)
                    ? null
                    : dto.Sauce.Trim(),
                AltText = string.IsNullOrWhiteSpace(dto.AltText)
                    ? null
                    : dto.AltText.Trim(),
                ImageUrl = string.IsNullOrWhiteSpace(dto.ImageUrl)
                    ? null
                    : dto.ImageUrl.Trim(),
                CategoryId = dto.CategoryId
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, MapToDto(product));
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch("{id:int}")]
        [Consumes("application/json-patch+json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<ProductDto>> PatchProduct(
            int id,
            [FromBody] JsonPatchDocument<UpdateProductDto> patchDoc)
        {
            if (patchDoc == null)
                return BadRequest();

            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return NotFound();

            var productToPatch = new UpdateProductDto
            {
                Name = product.Name,
                Ingredients = IngredientsHelper.Normalize(product.Ingredients),
                Price = product.Price,
                Sauce = product.Sauce,
                AltText = product.AltText,
                ImageUrl = product.ImageUrl,
                CategoryId = product.CategoryId
            };

            patchDoc.ApplyTo(productToPatch, ModelState);

            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            if (!TryValidateModel(productToPatch))
                return ValidationProblem(ModelState);

            if (string.IsNullOrWhiteSpace(productToPatch.Name))
            {
                ModelState.AddModelError(nameof(productToPatch.Name), "Namn är obligatoriskt.");
                return ValidationProblem(ModelState);
            }

            if (string.IsNullOrWhiteSpace(productToPatch.Ingredients))
            {
                ModelState.AddModelError(nameof(productToPatch.Ingredients), "Ingredienser är obligatoriskt.");
                return ValidationProblem(ModelState);
            }

            var nextSlug = SlugHelper.Normalize(productToPatch.Name);

            if (string.IsNullOrWhiteSpace(nextSlug))
            {
                ModelState.AddModelError(nameof(productToPatch.Name), "Ogiltigt namn för att skapa slug.");
                return ValidationProblem(ModelState);
            }

            var slugExists = await _context.Products
                .AnyAsync(p => p.Id != id && p.Slug == nextSlug);

            if (slugExists)
            {
                ModelState.AddModelError(nameof(productToPatch.Name), "En produkt med samma slug finns redan.");
                return ValidationProblem(ModelState);
            }

            if (productToPatch.CategoryId.HasValue)
            {
                var categoryExists = await _context.Categories
                    .AnyAsync(c => c.Id == productToPatch.CategoryId.Value);

                if (!categoryExists)
                {
                    ModelState.AddModelError(nameof(productToPatch.CategoryId), "Den angivna kategorin finns inte.");
                    return ValidationProblem(ModelState);
                }
            }

            product.Name = productToPatch.Name.Trim();
            product.Slug = nextSlug;
            product.Ingredients = IngredientsHelper.Normalize(productToPatch.Ingredients);
            product.Price = productToPatch.Price;
            product.Sauce = string.IsNullOrWhiteSpace(productToPatch.Sauce)
                ? null
                : productToPatch.Sauce.Trim();
            product.AltText = string.IsNullOrWhiteSpace(productToPatch.AltText)
                ? null
                : productToPatch.AltText.Trim();
            product.ImageUrl = string.IsNullOrWhiteSpace(productToPatch.ImageUrl)
                ? null
                : productToPatch.ImageUrl.Trim();
            product.CategoryId = productToPatch.CategoryId;

            await _context.SaveChangesAsync();

            return Ok(MapToDto(product));
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
                return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private static ProductDto MapToDto(Product p) => new ProductDto
        {
            Id = p.Id,
            Name = p.Name,
            Slug = p.Slug,
            Ingredients = IngredientsHelper.Normalize(p.Ingredients),
            Price = p.Price,
            Sauce = p.Sauce,
            AltText = p.AltText,
            ImageUrl = p.ImageUrl,
            CategoryId = p.CategoryId
        };
    }
}