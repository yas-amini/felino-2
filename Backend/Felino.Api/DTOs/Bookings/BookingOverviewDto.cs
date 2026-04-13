namespace Felino.Api.DTOs.Bookings;

public class BookingOverviewDto
{
    public int BookingId { get; set; }
    public int TableId { get; set; }
    public string TableName { get; set; } = null!;
    public DateOnly Date { get; set; }
    public TimeOnly Time { get; set; }
    public int NumberOfGuests { get; set; }
    public string CustomerName { get; set; } = null!;
    public string Status { get; set; } = null!;

}
