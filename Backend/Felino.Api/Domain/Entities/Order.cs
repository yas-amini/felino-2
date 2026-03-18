namespace Felino.Api.Domain.Entities
{
    using Felino.Api.Domain.Enums;

    public class Order
    {
        public int Id { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerAddress { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public string? Comment { get; set; } // From SQL: customer notes
        public decimal Subtotal { get; set; }
        public decimal Delivery { get; set; }
        public decimal Total { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow; // From SQL: auto-update timestamp
        public OrderStatus Status { get; set; } = OrderStatus.New;
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
