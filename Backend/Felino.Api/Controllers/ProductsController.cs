using Felino.Api.Data;
using Felino.Api.Domain.Entities;
using Felino.Api.Dtos.Products;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Felino.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ProductDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? slug = null)
        {
            if (!string.IsNullOrWhiteSpace(slug))
            {
                var productsBySlug = await _context.Products
                    .Where(p => p.Slug == slug)
                    .Select(p => MapToDto(p))
                    .ToListAsync();

                return Ok(productsBySlug);
            }

            if (page < 1)
                page = 1;

            if (pageSize < 1)
                pageSize = 10;

            var products = await _context.Products
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => MapToDto(p))
                .ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var product = await _context.Products
                .Where(p => p.Id == id)
                .Select(p => MapToDto(p))
                .FirstOrDefaultAsync();

            if (product == null)
                return NotFound();

            return Ok(product);
        }

        [Authorize]
        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(typeof(ProductDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] CreateProductDto dto)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            if (string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest();

            var product = new Product
            {
                Name = dto.Name.Trim(),
                Slug = GenerateSlug(dto.Name),
                Ingredients = dto.Ingredients,
                Price = dto.Price,
                Sauce = dto.Sauce,
                AltText = dto.AltText,
                ImageUrl = dto.ImageUrl,
                CategoryId = dto.CategoryId
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, MapToDto(product));
        }

        [Authorize]
        [HttpPatch("{id:int}")]
        [Consumes("application/json-patch+json")]
        [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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
                Ingredients = product.Ingredients,
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
                return BadRequest();

            product.Name = productToPatch.Name.Trim();
            product.Slug = GenerateSlug(productToPatch.Name);
            product.Ingredients = productToPatch.Ingredients;
            product.Price = productToPatch.Price;
            product.Sauce = productToPatch.Sauce;
            product.AltText = productToPatch.AltText;
            product.ImageUrl = productToPatch.ImageUrl;
            product.CategoryId = productToPatch.CategoryId;

            await _context.SaveChangesAsync();

            return Ok(MapToDto(product));
        }

        [Authorize]
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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
            Ingredients = p.Ingredients,
            Price = p.Price,
            Sauce = p.Sauce,
            AltText = p.AltText,
            ImageUrl = p.ImageUrl,
            CategoryId = p.CategoryId
        };

        private static string GenerateSlug(string name)
        {
            return name
                .Trim()
                .ToLower()
                .Replace("å", "a")
                .Replace("ä", "a")
                .Replace("ö", "o")
                .Replace(" ", "-");
        }
    }
}