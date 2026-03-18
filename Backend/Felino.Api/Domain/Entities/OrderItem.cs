namespace Felino.Api.Domain.Entities
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int? ProductId { get; set; } // Nullable because SQL uses ON DELETE SET NULL
        public string ProductName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string? Extras { get; set; } // Matches "extras" in SQL

        // Navigation property for Entity Framework
        public Order? Order { get; set; }
    }
}
