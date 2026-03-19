using Felino.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Felino.Api.Data.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasIndex(p => p.Slug)
                .IsUnique();

            builder.HasData(
                new Product
                {
                    Id = 1,
                    Name = "Margherita",
                    Slug = "margherita",
                    CategoryId = 1,
                    Ingredients = "[\"ost\"]",
                    Price = 95.00m,
                    Image = "/images/products/pizza-margherita.jpg",
                    AltText = "Margherita pizza med ost"
                },
                new Product
                {
                    Id = 2,
                    Name = "Vesuvio",
                    Slug = "vesuvio",
                    CategoryId = 1,
                    Ingredients = "[\"skinka\"]",
                    Price = 99.00m,
                    Image = "/images/products/pizza-vesuvio.jpg",
                    AltText = "Vesuvio pizza med skinka"
                },
                new Product
                {
                    Id = 3,
                    Name = "Hawaii",
                    Slug = "hawaii",
                    CategoryId = 1,
                    Ingredients = "[\"skinka\", \"ananas\"]",
                    Price = 105.00m,
                    Image = "/images/products/pizza-hawaii.jpg",
                    AltText = "Hawaii pizza med skinka och ananas"
                },
                new Product
                {
                    Id = 7,
                    Name = "Classic",
                    Slug = "classic",
                    CategoryId = 2,
                    Ingredients = "[\"sallad\", \"tomat\", \"lök\", \"gurka\"]",
                    Price = 95.00m,
                    Image = "/images/products/b-classic.jpg",
                    AltText = "Classic hamburgare",
                    Sauce = "dressing"
                },
                new Product
                {
                    Id = 13,
                    Name = "Kebabtallrik",
                    Slug = "kebabtallrik",
                    CategoryId = 3,
                    Ingredients = "[\"kebabkött\", \"pommes\", \"sallad\"]",
                    Price = 119.00m,
                    Image = "/images/products/k-kebabtallrik.jpg",
                    AltText = "Kebabtallrik med pommes"
                }
            );
        }
    }
}
