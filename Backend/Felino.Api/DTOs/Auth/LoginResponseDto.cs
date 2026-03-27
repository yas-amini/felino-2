using System.Text.Json.Serialization;

namespace Felino.Api.Dtos.Auth
{
    public class LoginResponseDto
    {
        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; } = null!;

        [JsonPropertyName("token_type")]
        public string TokenType { get; set; } = "Bearer";

        [JsonPropertyName("expires_in")]
        public int ExpiresIn { get; set; }
    }
}