namespace Felino.Api.Dtos.Categories
{
    public class MenuPreviewCategoryDto
    {
        public string Title { get; set; } = string.Empty;
        public List<MenuPreviewItemDto> Items { get; set; } = new();
    }

    public class MenuPreviewItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }
}