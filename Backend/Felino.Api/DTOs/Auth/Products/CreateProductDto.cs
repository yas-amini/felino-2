using System.ComponentModel.DataAnnotations;

namespace Felino.Api.Dtos.Products
{
    public class CreateProductDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(2000)]
        public string Ingredients { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }

        [MaxLength(100)]
        public string? Sauce { get; set; }

        [MaxLength(200)]
        public string? AltText { get; set; }

        [MaxLength(300)]
        public string? ImageUrl { get; set; }

        [Range(1, int.MaxValue)]
        public int CategoryId { get; set; }
    }
}