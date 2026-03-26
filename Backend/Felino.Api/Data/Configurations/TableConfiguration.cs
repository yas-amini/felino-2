using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Felino.Api.Domain.Entities;

namespace Felino.Api.Data.Configurations
{
    public class TableConfiguration : IEntityTypeConfiguration<Table>
    {
        public void Configure(EntityTypeBuilder<Table> entity)
        {
            entity.HasKey(t => t.Id);

            entity.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(50);

            entity.Property(t => t.Capacity)
                .IsRequired();

            entity.Property(t => t.Placement)
                .IsRequired()
                .HasMaxLength(50);

            entity.Property(t => t.CreatedAt)
                .IsRequired();

            entity.Property(t => t.UpdatedAt)
                .IsRequired();

            entity.HasMany(t => t.Bookings)
                .WithOne(b => b.Table)
                .HasForeignKey(b => b.TableId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
