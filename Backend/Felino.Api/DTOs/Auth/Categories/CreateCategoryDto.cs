using System.ComponentModel.DataAnnotations;

namespace Felino.Api.Dtos.Categories;

public class CreateCategoryDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(120)]
    public string? Slug { get; set; }

    [Required]
    [MaxLength(300)]
    public string Description { get; set; } = string.Empty;

    [MaxLength(300)]
    public string? ImageUrl { get; set; }
}