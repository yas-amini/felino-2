using System.ComponentModel.DataAnnotations;

namespace Felino.Api.DTOs.Bookings;

public class UpdateBookingDto
{
    [Required]
    public int BookingId { get; set; }

    [Required]
    [EmailAddress]
    [StringLength(150)]
    public string Email { get; set; } = null!;

    [Required]
    [StringLength(100)]
    public string Name { get; set; } = null!;

    [Required]
    [StringLength(20)]
    public string Phone { get; set; } = null!;

    [Required]
    public DateOnly Date { get; set; }

    [Required]
    public TimeOnly Time { get; set; }

    [Required]
    [Range(1, 20)]
    public int NumberOfGuests { get; set; }

    [Required]
    public bool OutdoorSeating { get; set; }

    [StringLength(500)]
    public string? SpecialRequests { get; set; }
}
