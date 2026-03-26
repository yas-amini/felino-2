namespace Felino.Api.DTOs.Bookings;

public class BookingDto
{
    public int BookingId { get; set; }
    public string Name { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Email { get; set; } = null!;

    public DateOnly Date { get; set; }
    public TimeOnly Time { get; set; }

    public int NumberOfGuests { get; set; }
    public bool OutdoorSeating { get; set; }
    public string? SpecialRequests { get; set; }

    public string TableName { get; set; } = null!;
    public string Placement { get; set; } = null!;
    public string Status { get; set; } = null!;
}