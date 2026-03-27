namespace Felino.Api.Dtos.Products
{
    public class ProductDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Slug { get; set; } = null!;

        public string? Ingredients { get; set; }

        public decimal Price { get; set; }

        public string? Sauce { get; set; }

        public string? AltText { get; set; }

        public string? ImageUrl { get; set; }

        public int CategoryId { get; set; }
    }
}