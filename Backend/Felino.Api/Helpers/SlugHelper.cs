namespace Felino.Api.Helpers;

public static class SlugHelper
{
    public static string Normalize(string value)
    {
        return value
            .Trim()
            .ToLower()
            .Replace("å", "a")
            .Replace("ä", "a")
            .Replace("ö", "o")
            .Replace(" ", "-");
    }
}