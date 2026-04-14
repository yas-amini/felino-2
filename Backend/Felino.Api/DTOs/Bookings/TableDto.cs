namespace Felino.Api.DTOs.Tables
{
    public class TableDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int Capacity { get; set; }
        public string Placement { get; set; } = null!;
    }
}