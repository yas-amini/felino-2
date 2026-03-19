namespace Felino.Api.Domain.Entities
{
    using Felino.Api.Domain.Enums;

    // Represents a customer's order, containing customer details, totals, and the list of ordered items.
    public class Order
    {
        public int Id { get; set; }

        public string CustomerName { get; set; } = string.Empty;
        public string CustomerAddress { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;

        // Optional notes or special requests provided by the customer at checkout.
        public string? Comment { get; set; } 

        public decimal Subtotal { get; set; }
        public decimal Delivery { get; set; }
        public decimal Total { get; set; }

        // The date and time when the order was first placed.
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Tracks the last time the order status or details were updated.
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // The current processing stage of the order (e.g., New, Preparing, Ready).
        public OrderStatus Status { get; set; } = OrderStatus.New;

        // The collection of individual products/items belonging to this order.
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
