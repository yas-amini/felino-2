namespace Felino.Api.Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; } = "";

        public string Slug { get; set; } = "";

        public string Ingredients { get; set; } = "";

        public decimal Price { get; set; }

        public string? Sauce { get; set; }
        
        public string? AltText { get; set; }
        
        public string? ImageUrl { get; set; }

        public int CategoryId { get; set; }

        public Category? Category { get; set; }
    }
}
