using Felino.Api.Domain.Entities;
using Felino.Api.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Felino.Api.Data.Seed
{
    public static class DbSeeder
    {
        public static async Task SeedTablesAsync(AppDbContext context)
        {
            if (await context.Tables.AnyAsync())
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

        public static async Task SeedCustomersAsync(AppDbContext context)
        {
            if (await context.Customers.AnyAsync())
                return;

            var now = DateTime.UtcNow;

            context.Customers.AddRange(
                new Customer
                {
                    Name = "Anna Andersson",
                    Phone = "0701234567",
                    Email = "anna@test.se",
                    CreatedAt = now
                },
                new Customer
                {
                    Name = "Erik Nilsson",
                    Phone = "0702345678",
                    Email = "erik@test.se",
                    CreatedAt = now
                },
                new Customer
                {
                    Name = "Sara Svensson",
                    Phone = "0703456789",
                    Email = "sara@test.se",
                    CreatedAt = now
                },
                new Customer
                {
                    Name = "Johan Lindberg",
                    Phone = "0704567890",
                    Email = "johan@test.se",
                    CreatedAt = now
                },
                new Customer
                {
                    Name = "Maja Karlsson",
                    Phone = "0705678901",
                    Email = "maja@test.se",
                    CreatedAt = now
                },
                new Customer
                {
                    Name = "Oskar Persson",
                    Phone = "0706789012",
                    Email = "oskar@test.se",
                    CreatedAt = now
                }
            );

            await context.SaveChangesAsync();
        }

        public static async Task SeedBookingsAsync(AppDbContext context)
        {
            if (await context.Bookings.AnyAsync())
                return;

            var tables = await context.Tables
                .OrderBy(t => t.Id)
                .ToListAsync();

            var customers = await context.Customers
                .OrderBy(c => c.Id)
                .ToListAsync();

            if (!tables.Any() || !customers.Any())
                return;

            var now = DateTime.UtcNow;

            context.Bookings.AddRange(
                new Booking
                {
                    CustomerId = customers[0].Id,
                    TableId = tables[0].Id,
                    Date = new DateOnly(2026, 4, 17),
                    Time = new TimeOnly(17, 0),
                    NumberOfGuests = 2,
                    OutdoorSeating = false,
                    SpecialRequests = "Gärna nära fönster",
                    Status = BookingStatus.Confirmed,
                    CreatedAt = now,
                    UpdatedAt = now
                },
                new Booking
                {
                    CustomerId = customers[1].Id,
                    TableId = tables[2].Id,
                    Date = new DateOnly(2026, 4, 17),
                    Time = new TimeOnly(18, 0),
                    NumberOfGuests = 4,
                    OutdoorSeating = false,
                    SpecialRequests = null,
                    Status = BookingStatus.Confirmed,
                    CreatedAt = now,
                    UpdatedAt = now
                },
                new Booking
                {
                    CustomerId = customers[2].Id,
                    TableId = tables[3].Id,
                    Date = new DateOnly(2026, 4, 17),
                    Time = new TimeOnly(19, 0),
                    NumberOfGuests = 4,
                    OutdoorSeating = true,
                    SpecialRequests = "Barnstol önskas",
                    Status = BookingStatus.Confirmed,
                    CreatedAt = now,
                    UpdatedAt = now
                },
                new Booking
                {
                    CustomerId = customers[3].Id,
                    TableId = tables[4].Id,
                    Date = new DateOnly(2026, 4, 18),
                    Time = new TimeOnly(18, 0),
                    NumberOfGuests = 5,
                    OutdoorSeating = false,
                    SpecialRequests = null,
                    Status = BookingStatus.Confirmed,
                    CreatedAt = now,
                    UpdatedAt = now
                },
                new Booking
                {
                    CustomerId = customers[4].Id,
                    TableId = tables[5].Id,
                    Date = new DateOnly(2026, 4, 18),
                    Time = new TimeOnly(20, 0),
                    NumberOfGuests = 6,
                    OutdoorSeating = true,
                    SpecialRequests = "Allergi mot nötter",
                    Status = BookingStatus.Confirmed,
                    CreatedAt = now,
                    UpdatedAt = now
                },
                new Booking
                {
                    CustomerId = customers[5].Id,
                    TableId = tables[6].Id,
                    Date = new DateOnly(2026, 4, 19),
                    Time = new TimeOnly(19, 0),
                    NumberOfGuests = 8,
                    OutdoorSeating = false,
                    SpecialRequests = "Födelsedag",
                    Status = BookingStatus.Confirmed,
                    CreatedAt = now,
                    UpdatedAt = now
                },
                new Booking
                {
                    CustomerId = customers[0].Id,
                    TableId = tables[1].Id,
                    Date = new DateOnly(2026, 4, 20),
                    Time = new TimeOnly(17, 0),
                    NumberOfGuests = 2,
                    OutdoorSeating = true,
                    SpecialRequests = null,
                    Status = BookingStatus.Confirmed,
                    CreatedAt = now,
                    UpdatedAt = now
                },
                new Booking
                {
                    CustomerId = customers[2].Id,
                    TableId = tables[7].Id,
                    Date = new DateOnly(2026, 4, 20),
                    Time = new TimeOnly(21, 0),
                    NumberOfGuests = 8,
                    OutdoorSeating = true,
                    SpecialRequests = "Sen ankomst",
                    Status = BookingStatus.Confirmed,
                    CreatedAt = now,
                    UpdatedAt = now
                }
            );

            await context.SaveChangesAsync();
        }
    }
}