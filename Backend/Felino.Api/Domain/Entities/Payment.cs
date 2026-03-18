namespace Felino.Api.Domain.Entities
{
    using Felino.Api.Domain.Enums;

    public class Payment
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; } = string.Empty; // e.g. "Card", "Swish", "Cash"
        public PaymentStatus Status { get; set; } = PaymentStatus.Unpaid;
        public string? TransactionId { get; set; } // External ID from payment provider
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property
        public Order? Order { get; set; }
    }
}
