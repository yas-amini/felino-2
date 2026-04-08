using System.Text.Json;

namespace Felino.Api.Helpers;

public static class IngredientsHelper
{
    public static string Normalize(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return string.Empty;

        value = value.Trim();

        if (!value.StartsWith("["))
            return value;

        try
        {
            var items = JsonSerializer.Deserialize<List<string>>(value);

            if (items == null || items.Count == 0)
                return string.Empty;

            return string.Join(", ",
                items
                    .Where(x => !string.IsNullOrWhiteSpace(x))
                    .Select(x => x.Trim()));
        }
        catch
        {
            return value
                .Replace("[", "")
                .Replace("]", "")
                .Replace("\"", "")
                .Trim();
        }
    }
}