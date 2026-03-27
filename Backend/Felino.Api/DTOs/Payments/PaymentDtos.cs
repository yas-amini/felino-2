using System.ComponentModel.DataAnnotations;
using Felino.Api.Domain.Enums;

namespace Felino.Api.DTOs.Payments;

public class ProcessPaymentDto
{
    [Required]
    public int OrderId { get; set; }

    [Required]
    [Range(0.01, 1000000)]
    public decimal Amount { get; set; }

    [Required]
    [StringLength(50)]
    public string PaymentMethod { get; set; } = null!;
}

public class PaymentDto
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public decimal Amount { get; set; }
    public string PaymentMethod { get; set; } = null!;
    public PaymentStatus Status { get; set; }
    public string? TransactionId { get; set; }
    public DateTime CreatedAt { get; set; }
}
