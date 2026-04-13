using System.ComponentModel.DataAnnotations;

namespace Felino.Api.DTOs.Bookings;

public class UpdateTableDto
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
