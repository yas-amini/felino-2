using System.ComponentModel.DataAnnotations;

namespace Felino.Api.Dtos.Products
{
    public class CreateProductDto
    {
        [Required]
        public string Name { get; set; } = null!;

        public string? Ingredients { get; set; }

        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }

        public string? Sauce { get; set; }

        public string? AltText { get; set; }

        public string? ImageUrl { get; set; }

        [Range(1, int.MaxValue)]
        public int CategoryId { get; set; }
    }
}