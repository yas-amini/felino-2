using System.ComponentModel.DataAnnotations;

namespace Felino.Api.DTOs.Tables;

public class CreateTableDto
{
    [Required]
    [StringLength(50)]
    public string Name { get; set; } = null!;

    [Required]
    [Range(1, 20)]
    public int Capacity { get; set; }

    [Required]
    [StringLength(50)]
    public string Placement { get; set; } = null!;
}
