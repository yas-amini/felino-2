namespace Felino.Api.Domain.Entities
{
    // Represents a single line item within an order, capturing a snapshot of the product details at the time of purchase.
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }

        // Reference to the original Product. Nullable if the product is later removed from the menu.
        public int? ProductId { get; set; } 

        public string ProductName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }

        // Specific customizations for this item (e.g., "No onions", "Extra cheese").
        public string? Extras { get; set; } 
        
        // Navigation property to the parent Order.
        public Order? Order { get; set; }
    }
}
