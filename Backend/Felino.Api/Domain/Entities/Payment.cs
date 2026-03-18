namespace Felino.Api.Domain.Entities
{
    using Felino.Api.Domain.Enums;

    // Tracks the financial transaction details for an order, including status and payment method.
    public class Payment
    {
        public int Id { get; set; }
        public int OrderId { get; set; }

        // The total amount processed in this payment transaction.
        public decimal Amount { get; set; }

        // The method used for payment (e.g., "Card", "Swish", "Cash").
        public string PaymentMethod { get; set; } = string.Empty;

        // The current status of the payment (e.g., Unpaid, Paid, Refunded).
        public PaymentStatus Status { get; set; } = PaymentStatus.Unpaid;

        // The unique ID returned from the external payment provider (Stripe/Swish).
        public string? TransactionId { get; set; } 

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation property to the associated Order.
        public Order? Order { get; set; }
    }
}
