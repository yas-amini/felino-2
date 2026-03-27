using Felino.Api.DTOs.Payments;

namespace Felino.Api.Services.Interfaces
{
    public interface IPaymentService
    {
        Task<PaymentDto> ProcessPaymentAsync(ProcessPaymentDto dto);
        Task<PaymentDto?> GetPaymentByOrderIdAsync(int orderId);
    }
}
