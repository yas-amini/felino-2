using Felino.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Felino.Api.Infrastructure.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {

            builder.ToTable("Users");

            builder.HasKey(u => u.Id);

            builder.Property(u => u.Username)
                .IsRequired()
                .HasMaxLength(50);

            builder.HasIndex(u => u.Username)
                .IsUnique();

            builder.Property(u => u.PasswordHash)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(u => u.Role)
                .IsRequired()
                .HasMaxLength(20)
                .HasDefaultValue("Admin");

            builder.Property(u => u.CreatedAt)
                .IsRequired();
        }
    }
}