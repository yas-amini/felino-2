using Felino.Api.Data;
using Felino.Api.Domain.Entities;
using Felino.Api.Domain.Enums;
using Felino.Api.DTOs.Payments;
using Felino.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Felino.Api.Implementations
{
    public class PaymentService : IPaymentService
    {
        private readonly AppDbContext _context;

        public PaymentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PaymentDto> ProcessPaymentAsync(ProcessPaymentDto dto)
        {
            var order = await _context.Orders.FindAsync(dto.OrderId);
            if (order == null) throw new ArgumentException($"Order {dto.OrderId} not found.");

            var payment = new Payment
            {
                OrderId = dto.OrderId,
                Amount = dto.Amount,
                PaymentMethod = dto.PaymentMethod,
                Status = PaymentStatus.Paid, // Simplified: assume payment succeeds
                TransactionId = Guid.NewGuid().ToString(),
                CreatedAt = DateTime.UtcNow
            };

            // Update order status once paid
            order.Status = OrderStatus.Preparing;
            order.UpdatedAt = DateTime.UtcNow;

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return MapToDto(payment);
        }

        public async Task<PaymentDto?> GetPaymentByOrderIdAsync(int orderId)
        {
            var payment = await _context.Payments
                .FirstOrDefaultAsync(p => p.OrderId == orderId);

            return payment == null ? null : MapToDto(payment);
        }

        private static PaymentDto MapToDto(Payment payment)
        {
            return new PaymentDto
            {
                Id = payment.Id,
                OrderId = payment.OrderId,
                Amount = payment.Amount,
                PaymentMethod = payment.PaymentMethod,
                Status = payment.Status,
                TransactionId = payment.TransactionId,
                CreatedAt = payment.CreatedAt
            };
        }
    }
}
