using Felino.Api.DTOs.Bookings;

namespace Felino.Api.Services.Interfaces
{
    public interface IBookingService
    {
        Task<BookingDto> CreateBookingAsync(CreateBookingDto dto);
        Task<BookingDto> FindBookingAsync(FindBookingDto dto);
        Task<BookingDto> CancelBookingAsync(CancelBookingDto dto);

    }
}