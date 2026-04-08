using System.ComponentModel.DataAnnotations;

namespace Felino.Api.Dtos.Campaigns
{
    public class UpdateCampaignDto
    {
        [Required(ErrorMessage = "Titel är obligatorisk.")]
        [MaxLength(100, ErrorMessage = "Titel får vara max 100 tecken.")]
        public string Title { get; set; } = "";

        [Required(ErrorMessage = "Beskrivning är obligatorisk.")]
        [MaxLength(200, ErrorMessage = "Beskrivning får vara max 200 tecken.")]
        public string Body { get; set; } = "";

        [MaxLength(300, ErrorMessage = "ImageUrl får vara max 300 tecken.")]
        public string? ImageUrl { get; set; }

        [MaxLength(200, ErrorMessage = "AltText får vara max 200 tecken.")]
        public string? AltText { get; set; }

        [Required(ErrorMessage = "Startdatum är obligatoriskt.")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "Slutdatum är obligatoriskt.")]
        public DateTime EndDate { get; set; }
    }
}