using Felino.Api.Data;
using Felino.Api.Domain.Entities;
using Felino.Api.Domain.Enums;
using Felino.Api.DTOs.Bookings;
using Felino.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Felino.Api.Services.Implementations;

public class BookingService : IBookingService
{
    private readonly AppDbContext _context;

    public BookingService(AppDbContext context)
    {
        _context = context;
    }

    private static readonly Dictionary<DayOfWeek, (TimeOnly Start, TimeOnly End)> BookableHours = new()
{
    { DayOfWeek.Monday,    (new TimeOnly(11, 0), new TimeOnly(21, 0)) },
    { DayOfWeek.Tuesday,   (new TimeOnly(11, 0), new TimeOnly(21, 0)) },
    { DayOfWeek.Wednesday, (new TimeOnly(11, 0), new TimeOnly(21, 0)) },
    { DayOfWeek.Thursday,  (new TimeOnly(11, 0), new TimeOnly(21, 0)) },
    { DayOfWeek.Friday,    (new TimeOnly(11, 0), new TimeOnly(22, 0)) },
    { DayOfWeek.Saturday,  (new TimeOnly(11, 0), new TimeOnly(22, 0)) },
    { DayOfWeek.Sunday,    (new TimeOnly(12, 0), new TimeOnly(21, 0)) }
};

    private bool IsBookingTimeValid(DateOnly date, TimeOnly time)
    {
        var dayOfWeek = date.ToDateTime(TimeOnly.MinValue).DayOfWeek;

        if (!BookableHours.TryGetValue(dayOfWeek, out var hours))
            return false;

        return time >= hours.Start && time <= hours.End;
    }

    private bool IsBookingIntervalValid(TimeOnly time)
    {
        return time.Minute == 0;
    }

    public async Task<BookingDto> CreateBookingAsync(CreateBookingDto dto)
    {
        if (dto.NumberOfGuests <= 0)
            throw new ArgumentException("Number of guests must be greater than zero.");

        if (dto.Date < DateOnly.FromDateTime(DateTime.Today))
            throw new ArgumentException("Booking date cannot be in the past.");

        if (!IsBookingTimeValid(dto.Date, dto.Time))
            throw new ArgumentException("Vald tid ligger utanför bokningsbara tider.");

        if (!IsBookingIntervalValid(dto.Time))
            throw new ArgumentException("Vald tid är inte ett giltigt bokningsintervall.");

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

    public async Task<BookingDto> CancelBookingAsync(CancelBookingDto dto)
    {
        var booking = await _context.Bookings
            .Include(b => b.Customer)
            .Include(b => b.Table)
            .FirstOrDefaultAsync(b =>
                b.Id == dto.BookingId &&
                b.Customer.Email == dto.Email);

        if (booking == null)
            throw new KeyNotFoundException("Ingen bokning hittades med det angivna bokningsnumret och e-postadressen.");

        if (booking.Status == BookingStatus.Cancelled)
            throw new InvalidOperationException("Bokningen är redan avbokad.");

        booking.Status = BookingStatus.Cancelled;
        booking.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

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
    public async Task<BookingDto> UpdateBookingAsync(UpdateBookingDto dto)
    {
        if (dto.NumberOfGuests <= 0)
            throw new ArgumentException("Number of guests must be greater than zero.");

        if (dto.Date < DateOnly.FromDateTime(DateTime.Today))
            throw new ArgumentException("Booking date cannot be in the past.");

        if (!IsBookingTimeValid(dto.Date, dto.Time))
            throw new ArgumentException("Vald tid ligger utanför bokningsbara tider.");

        if (!IsBookingIntervalValid(dto.Time))
            throw new ArgumentException("Vald tid är inte ett giltigt bokningsintervall.");

        var booking = await _context.Bookings
            .Include(b => b.Customer)
            .Include(b => b.Table)
            .FirstOrDefaultAsync(b =>
                b.Id == dto.BookingId &&
                b.Customer.Email == dto.Email);

        if (booking == null)
            throw new KeyNotFoundException("Ingen bokning hittades med det angivna bokningsnumret och e-postadressen.");

        if (booking.Status == BookingStatus.Cancelled)
            throw new InvalidOperationException("Det går inte att ändra en avbokad bokning.");

        booking.Customer.Name = dto.Name;
        booking.Customer.Phone = dto.Phone;

        var table = await FindAvailableTableForUpdateAsync(dto, booking.Id);

        if (table == null)
            throw new InvalidOperationException("Inga lediga bord hittades för vald tid.");

        booking.TableId = table.Id;
        booking.Date = dto.Date;
        booking.Time = dto.Time;
        booking.NumberOfGuests = dto.NumberOfGuests;
        booking.OutdoorSeating = dto.OutdoorSeating;
        booking.SpecialRequests = dto.SpecialRequests;
        booking.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

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
            TableName = table.Name,
            Placement = table.Placement,
            Status = booking.Status.ToString()
        };
    }
    private async Task<Table?> FindAvailableTableForUpdateAsync(UpdateBookingDto dto, int bookingIdToExclude)
    {
        var requestedPlacement = dto.OutdoorSeating ? "Outdoor" : "Indoor";

        var candidateTables = await _context.Tables
            .Where(t => t.Placement == requestedPlacement && t.Capacity >= dto.NumberOfGuests)
            .OrderBy(t => t.Capacity)
            .ToListAsync();

        foreach (var table in candidateTables)
        {
            var isBooked = await _context.Bookings.AnyAsync(b =>
                b.Id != bookingIdToExclude &&
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
