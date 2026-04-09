namespace Felino.Api.DTOs.Admin
{
    public class AdminNoticeDto
    {
        public int Id { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public string To { get; set; } = string.Empty;
    }
}