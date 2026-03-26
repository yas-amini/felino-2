using Felino.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Felino.Api.Infrastructure.Persistence.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.ToTable("Categories");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.Slug)
                .IsRequired()
                .HasMaxLength(120);

            builder.Property(x => x.Description)
                .IsRequired()
                .HasMaxLength(300);

            builder.Property(x => x.ImageUrl)
                .HasMaxLength(300);

            builder.HasIndex(x => x.Slug)
                .IsUnique();

            builder.HasMany(x => x.Products)
                .WithOne(x => x.Category)
                .HasForeignKey(x => x.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasData(
                new Category
                {
                    Id = 1,
                    Name = "Pizza",
                    Slug = "pizza",
                    Description = "Klassiska pizzor med olika toppings.",
                    ImageUrl = "/images/products/pizzas.png"
                },
                new Category
                {
                    Id = 2,
                    Name = "Burger",
                    Slug = "burger",
                    Description = "Hamburgare med klassiska och moderna tillbehör.",
                    ImageUrl = "/images/products/burgers.png"
                },
                new Category
                {
                    Id = 3,
                    Name = "Kebab",
                    Slug = "kebab",
                    Description = "Kebab, gyros och rullar serverade med fräscha tillbehör.",
                    ImageUrl = "/images/products/kebab.png"
                },
                new Category
                {
                    Id = 4,
                    Name = "Pasta",
                    Slug = "pasta",
                    Description = "Pastarätter med smakrika såser och klassiska recept.",
                    ImageUrl = "/images/products/pasta.png"
                },
                new Category
                {
                    Id = 5,
                    Name = "Sallad",
                    Slug = "sallad",
                    Description = "Fräscha sallader med kyckling, ost, räkor och grönsaker.",
                    ImageUrl = "/images/products/sallad.png"
                },
                new Category
                {
                    Id = 6,
                    Name = "Grill",
                    Slug = "grill",
                    Description = "Grillrätter serverade med pommes och goda tillbehör.",
                    ImageUrl = "/images/products/grill.png"
                },
                new Category
                {
                    Id = 7,
                    Name = "Tillbehör",
                    Slug = "tillbehor",
                    Description = "Pommes, såser och andra tillbehör som passar till maten.",
                    ImageUrl = "/images/products/tillbehor.png"
                },
                new Category
                {
                    Id = 8,
                    Name = "Dryck",
                    Slug = "dryck",
                    Description = "Läsk, vatten och andra drycker till maten.",
                    ImageUrl = "/images/products/dryck.png"
                }
            );
        }
    }
}
