using System.ComponentModel.DataAnnotations;

namespace Felino.Api.Domain.Entities
{
    public class Campaign
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = "";

        [Required]
        [MaxLength(200)]
        public string Body { get; set; } = "";

        public string? ImageUrl { get; set; }
        
        public string? AltText { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
