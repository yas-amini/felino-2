namespace Felino.Api.Domain.Entities
{
    using Felino.Api.Domain.Enums;

    public class Booking
    {
        public int Id { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; } = null!;

        public DateOnly Date { get; set; }
        public TimeOnly Time { get; set; }

        public int NumberOfGuests { get; set; }
        public bool OutdoorSeating { get; set; }
        public string? SpecialRequests { get; set; }

        public int TableId { get; set; }
        public Table Table { get; set; } = null!;

        public BookingStatus Status { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}
