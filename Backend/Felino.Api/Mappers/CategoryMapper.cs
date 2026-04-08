using Felino.Api.Domain.Entities;
using Felino.Api.Dtos.Categories;
using Felino.Api.Helpers;

namespace Felino.Api.Mappers;

public static class CategoryMapper
{
    public static CategoryDto ToDto(this Category category)
    {
        return new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            Slug = category.Slug,
            Description = category.Description,
            ImageUrl = category.ImageUrl,
            Products = category.Products.Select(p => new ProductListItemDto
            {
                Id = p.Id,
                Name = p.Name,
                Slug = p.Slug,
                Ingredients = IngredientsHelper.Normalize(p.Ingredients),
                Price = p.Price,
                Sauce = p.Sauce,
                AltText = p.AltText,
                ImageUrl = p.ImageUrl,
                CategoryId = p.CategoryId
            }).ToList()
        };
    }
}