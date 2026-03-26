using Felino.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Felino.Api.Data.Configurations
{
    public class BookingConfiguration : IEntityTypeConfiguration<Booking>
    {
        public void Configure(EntityTypeBuilder<Booking> entity)
        {
            entity.HasKey(b => b.Id);

            entity.Property(b => b.Date)
                .IsRequired();

            entity.Property(b => b.Time)
                .IsRequired();

            entity.Property(b => b.NumberOfGuests)
                .IsRequired();

            entity.Property(b => b.OutdoorSeating)
                .IsRequired();

            entity.Property(b => b.SpecialRequests)
                .HasMaxLength(500);

            entity.Property(b => b.Status)
                .IsRequired()
                .HasConversion<int>();

            entity.Property(b => b.CreatedAt)
                .IsRequired();

            entity.Property(b => b.UpdatedAt)
                .IsRequired();
        }
    }
}
