using Felino.Api.Data;
using Felino.Api.Domain.Entities;
using Felino.Api.Domain.Enums;
using Felino.Api.DTOs.Bookings;
using Felino.Api.Implementations;
using Felino.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Pizzeria.Api.Services.Implementations;

public class BookingService : IBookingService
{
    private readonly AppDbContext _context;

    public BookingService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<BookingDto> CreateBookingAsync(CreateBookingDto dto)
    {
        if (dto.NumberOfGuests <= 0)
            throw new ArgumentException("Number of guests must be greater than zero.");

        if (dto.Date < DateOnly.FromDateTime(DateTime.Today))
            throw new ArgumentException("Booking date cannot be in the past.");

        var customer = await GetOrCreateCustomerAsync(dto);
        var table = await FindAvailableTableAsync(dto);

        if (table == null)
            throw new InvalidOperationException("No available table found for the selected date and time.");

        var booking = new Booking
        {
            CustomerId = customer.Id,
            TableId = table.Id,
            Date = dto.Date,
            Time = dto.Time,
            NumberOfGuests = dto.NumberOfGuests,
            OutdoorSeating = dto.OutdoorSeating,
            SpecialRequests = dto.SpecialRequests,
            Status = BookingStatus.Confirmed,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();

        return new BookingDto
        {
            BookingId = booking.Id,
            Name = customer.Name,
            Phone = customer.Phone,
            Email = customer.Email,
            Date = booking.Date,
            Time = booking.Time,
            NumberOfGuests = booking.NumberOfGuests,
            OutdoorSeating = booking.OutdoorSeating,
            SpecialRequests = booking.SpecialRequests,
            TableName = table.Name,
            Placement = table.Placement,
            Status = booking.Status.ToString()
        };
    }
    public async Task<BookingDto> FindBookingAsync(FindBookingDto dto)
    {
        var booking = await _context.Bookings
            .Include(b => b.Customer)
            .Include(b => b.Table)
            .FirstOrDefaultAsync(b =>
                b.Id == dto.BookingId &&
                b.Customer.Email == dto.Email);

        if (booking == null)
            throw new KeyNotFoundException("Ingen bokning hittades med det angivna bokningsnumret och e-postadressen.");

        return new BookingDto
        {
            BookingId = booking.Id,
            Name = booking.Customer.Name,
            Phone = booking.Customer.Phone,
            Email = booking.Customer.Email,
            Date = booking.Date,
            Time = booking.Time,
            NumberOfGuests = booking.NumberOfGuests,
            OutdoorSeating = booking.OutdoorSeating,
            SpecialRequests = booking.SpecialRequests,
            TableName = booking.Table.Name,
            Placement = booking.Table.Placement,
            Status = booking.Status.ToString()
        };
    }

    private async Task<Customer> GetOrCreateCustomerAsync(CreateBookingDto dto)
    {
        var existingCustomer = await _context.Customers
            .FirstOrDefaultAsync(c => c.Email == dto.Email);

        if (existingCustomer != null)
        {
            existingCustomer.Name = dto.Name;
            existingCustomer.Phone = dto.Phone;
            return existingCustomer;
        }

        var customer = new Customer
        {
            Name = dto.Name,
            Phone = dto.Phone,
            Email = dto.Email,
            CreatedAt = DateTime.UtcNow
        };

        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();

        return customer;
    }

    private async Task<Table?> FindAvailableTableAsync(CreateBookingDto dto)
    {
        var requestedPlacement = dto.OutdoorSeating ? "Outdoor" : "Indoor";

        var candidateTables = await _context.Tables
            .Where(t => t.Placement == requestedPlacement && t.Capacity >= dto.NumberOfGuests)
            .OrderBy(t => t.Capacity)
            .ToListAsync();

        foreach (var table in candidateTables)
        {
            var isBooked = await _context.Bookings.AnyAsync(b =>
                b.TableId == table.Id &&
                b.Date == dto.Date &&
                b.Time == dto.Time &&
                b.Status == BookingStatus.Confirmed);

            if (!isBooked)
            {
                return table;
            }
        }

        return null;
    }
}
