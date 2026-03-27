namespace Felino.Api.Dtos.Products
{
    public class CreateProductDto
    {
        public string Name { get; set; } = "";
        public string Ingredients { get; set; } = "";
        public decimal Price { get; set; }
        public string? Sauce { get; set; }
        public string? AltText { get; set; }
        public string? ImageUrl { get; set; }
        public int CategoryId { get; set; }
    }
}