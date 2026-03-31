using System.ComponentModel.DataAnnotations;

namespace Felino.Api.Dtos.Auth
{
    public class LoginRequestDto
    {
        [Required]
        public string Username { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;
    }
}