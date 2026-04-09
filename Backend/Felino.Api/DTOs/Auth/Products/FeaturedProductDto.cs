namespace Felino.Api.Dtos.Products
{
    public class FeaturedProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Ingredients { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string? Sauce { get; set; }
        public string? AltText { get; set; }
        public string? ImageUrl { get; set; }
        public int? CategoryId { get; set; }

        public int TotalSold { get; set; }
        public bool IsFallback { get; set; }
    }
}