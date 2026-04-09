namespace Felino.Api.Dtos.Campaigns
{
    public class CampaignDto
    {
        public int Id { get; set; }

        public string Title { get; set; } = "";

        public string Body { get; set; } = "";

        public string? ImageUrl { get; set; }

        public string? AltText { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}