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
        public decimal Subtotal { get; set; }
        public decimal Delivery { get; set; }
        public decimal Total { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
