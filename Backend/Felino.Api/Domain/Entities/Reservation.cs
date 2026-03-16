namespace Felino.Api.Domain.Entities
{
    using Felino.Api.Domain.Enums;

    public class Reservation
    {
        public int Id { get; set; }
        public int TableId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Seats { get; set; }
        public ReservationStatus Status { get; set; } = ReservationStatus.Pending;
    }
}
