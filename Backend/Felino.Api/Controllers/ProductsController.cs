using Felino.Api.Data;
using Felino.Api.Domain.Entities;
using Felino.Api.Dtos.Products;
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
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts(
            int page = 1,
            int pageSize = 10,
            string? slug = null)
        {
            if (!string.IsNullOrEmpty(slug))
            {
                var product = await _context.Products
                    .Where(p => p.Slug == slug)
                    .Select(p => MapToDto(p))
                    .ToListAsync();

                return Ok(product);
            }

            var products = await _context.Products
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => MapToDto(p))
                .ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
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

        [HttpPost]
        public async Task<ActionResult<ProductDto>> CreateProduct(CreateProductDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest("Name is required");

            var slug = GenerateSlug(dto.Name);

            var product = new Product
            {
                Name = dto.Name,
                Slug = slug,
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

        [HttpDelete("{id}")]
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