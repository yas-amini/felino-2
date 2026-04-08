using Felino.Api.Dtos.Products;

namespace Felino.Api.Services.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<FeaturedProductDto>> GetFeaturedProductsAsync(int take = 6);
    }
}