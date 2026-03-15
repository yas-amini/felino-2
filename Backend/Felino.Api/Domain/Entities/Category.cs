namespace Felino.Api.Domain.Entities
{
    public class Table
namespace Felino.Api.Domain.Entities
{
    public class Table
    {
        public int TableId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Seats { get; set; }
        public string Location { get; set; } = string.Empty;
    }
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
    }
}
