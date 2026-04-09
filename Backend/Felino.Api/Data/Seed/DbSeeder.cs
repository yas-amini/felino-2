using Felino.Api.Data;
using Felino.Api.Domain.Entities;

namespace Felino.Api.Data.Seed
{
    public static class DbSeeder
    {
        public static async Task SeedTablesAsync(AppDbContext context)
        {
            if (context.Tables.Any())
                return;

            var now = DateTime.UtcNow;

            context.Tables.AddRange(
                new Table
                {
                    Name = "Bord 1",
                    Capacity = 2,
                    Placement = "Indoor",
                    CreatedAt = now,
                    UpdatedAt = now
                },
                new Table
                {
                    Name = "Bord 2",
                    Capacity = 2,
                    Placement = "Outdoor",
                    CreatedAt = now,
                    UpdatedAt = now
                },
                new Table
                {
                    Name = "Bord 3",
                    Capacity = 4,
                    Placement = "Indoor",
                    CreatedAt = now,
                    UpdatedAt = now
                },
                new Table
                {
                    Name = "Bord 4",
                    Capacity = 4,
                    Placement = "Outdoor",
                    CreatedAt = now,
                    UpdatedAt = now
                },
                new Table
                {
                    Name = "Bord 5",
                    Capacity = 6,
                    Placement = "Indoor",
                    CreatedAt = now,
                    UpdatedAt = now
                },
                new Table
                {
                    Name = "Bord 6",
                    Capacity = 6,
                    Placement = "Outdoor",
                    CreatedAt = now,
                    UpdatedAt = now
                },
                new Table
                {
                    Name = "Bord 7",
                    Capacity = 8,
                    Placement = "Indoor",
                    CreatedAt = now,
                    UpdatedAt = now
                },
                new Table
                {
                    Name = "Bord 8",
                    Capacity = 8,
                    Placement = "Outdoor",
                    CreatedAt = now,
                    UpdatedAt = now
                }
            );

            await context.SaveChangesAsync();
        }
    }
}
