using Felino.Api.DTOs.Bookings;

namespace Felino.Api.Services.Interfaces
{
    public interface IBookingService
    {
        Task<BookingDto> CreateBookingAsync(CreateBookingDto dto);
        Task<BookingDto> FindBookingAsync(FindBookingDto dto);
        Task<BookingDto> CancelBookingAsync(CancelBookingDto dto);
        Task<BookingDto> UpdateBookingAsync(UpdateBookingDto dto);
        Task<List<BookingDto>> GetBookingsByDateAsync(DateOnly date);
        Task<List<BookingOverviewDto>> GetBookingsOverviewByDateAsync(DateOnly date);

    }
}