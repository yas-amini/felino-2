using Felino.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Felino.Api.Data.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasIndex(c => c.Slug)
                .IsUnique();

            builder.HasData(
                new Category { Id = 1, Name = "Pizza", Slug = "pizza" },
                new Category { Id = 2, Name = "Burgare", Slug = "burger" },
                new Category { Id = 3, Name = "Kebab", Slug = "kebab" },
                new Category { Id = 4, Name = "Pasta", Slug = "pasta" },
                new Category { Id = 5, Name = "Sallad", Slug = "sallad" },
                new Category { Id = 6, Name = "Grill", Slug = "grill" }
            );
        }
    }
}
