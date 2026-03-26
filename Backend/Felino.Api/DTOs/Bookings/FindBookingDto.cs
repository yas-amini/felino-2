using System.ComponentModel.DataAnnotations;

namespace Felino.Api.DTOs.Bookings;

public class FindBookingDto
{
    [Required]
    public int BookingId { get; set; }

    [Required]
    [EmailAddress]
    [StringLength(150)]
    public string Email { get; set; } = null!;
}