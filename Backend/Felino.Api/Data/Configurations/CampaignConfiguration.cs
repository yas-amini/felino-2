using Felino.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Felino.Api.Infrastructure.Persistence.Configurations
{
    public class CampaignConfiguration : IEntityTypeConfiguration<Campaign>
    {
        public void Configure(EntityTypeBuilder<Campaign> builder)
        {
            builder.ToTable("Campaigns");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Title)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.Body)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(x => x.ImageUrl)
                .HasMaxLength(300);

            builder.Property(x => x.AltText)
                .HasMaxLength(200);

            builder.Property(x => x.StartDate)
                .IsRequired();

            builder.Property(x => x.EndDate)
                .IsRequired();

            builder.HasData(
                new Campaign
                {
                    Id = 1,
                    Title = "Luncherbjudande",
                    Body = "Alla pizzor för 89 kr mellan 11–14!",
                    ImageUrl = "/images/campaigns/lunch.png",
                    AltText = "Lunchpizza erbjudande",
                    StartDate = new DateTime(2026, 1, 1),
                    EndDate = new DateTime(2026, 12, 31)
                },
                new Campaign
                {
                    Id = 2,
                    Title = "Familjepaket",
                    Body = "2 pizzor + 2 dryck för endast 199 kr!",
                    ImageUrl = "/images/campaigns/family.png",
                    AltText = "Familjepizza erbjudande",
                    StartDate = new DateTime(2026, 1, 1),
                    EndDate = new DateTime(2026, 12, 31)
                },
                new Campaign
                {
                    Id = 3,
                    Title = "Helgdeal",
                    Body = "Valfri burgare + pommes + dryck för 129 kr!",
                    ImageUrl = "/images/campaigns/weekend.png",
                    AltText = "Helgdeal burgare",
                    StartDate = new DateTime(2026, 1, 1),
                    EndDate = new DateTime(2026, 12, 31)
                },
                new Campaign
                {
                    Id = 4,
                    Title = "Studentrabatt",
                    Body = "10% rabatt på hela menyn med studentkort.",
                    ImageUrl = "/images/campaigns/student.png",
                    AltText = "Studentrabatt",
                    StartDate = new DateTime(2026, 1, 1),
                    EndDate = new DateTime(2026, 12, 31)
                }
            );
        }
    }
}