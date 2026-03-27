using System.ComponentModel.DataAnnotations;
using Felino.Api.Domain.Enums;

namespace Felino.Api.DTOs.Orders;

public class CreateOrderDto
{
    [Required]
    [StringLength(100)]
    public string CustomerName { get; set; } = null!;

    [Required]
    [StringLength(200)]
    public string CustomerAddress { get; set; } = null!;

    [Required]
    [StringLength(20)]
    public string CustomerPhone { get; set; } = null!;

    [Required]
    [EmailAddress]
    public string CustomerEmail { get; set; } = null!;

    public string? Comment { get; set; }

    [Required]
    public List<CreateOrderItemDto> Items { get; set; } = new();
}

public class CreateOrderItemDto
{
    [Required]
    public int ProductId { get; set; }

    [Required]
    [Range(1, 100)]
    public int Quantity { get; set; }

    public string? Extras { get; set; }
}

public class OrderDto
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = null!;
    public decimal Total { get; set; }
    public OrderStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<OrderItemDto> Items { get; set; } = new();
}

public class OrderItemDto
{
    public int ProductId { get; set; }
    public string ProductName { get; set; } = null!;
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public string? Extras { get; set; }
}
