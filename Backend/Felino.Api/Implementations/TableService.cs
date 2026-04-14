using Microsoft.EntityFrameworkCore;
using Felino.Api.Data;
using Felino.Api.DTOs.Tables;
using Felino.Api.Services.Interfaces;
using Felino.Api.Domain.Entities;

namespace Felino.Api.Services.Implementations;

public class TableService : ITableService
{
    private readonly AppDbContext _context;

    public TableService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<TableDto>> GetAllTablesAsync()
    {
        return await _context.Tables
            .OrderBy(t => t.Id)
            .Select(t => new TableDto
            {
                Id = t.Id,
                Name = t.Name,
                Capacity = t.Capacity,
                Placement = t.Placement
            })
            .ToListAsync();
    }
    public async Task<TableDto> CreateTableAsync(CreateTableDto dto)
    {
        var table = new Table
        {
            Name = dto.Name,
            Capacity = dto.Capacity,
            Placement = dto.Placement,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Tables.Add(table);
        await _context.SaveChangesAsync();

        return new TableDto
        {
            Id = table.Id,
            Name = table.Name,
            Capacity = table.Capacity,
            Placement = table.Placement
        };
    }
    public async Task<TableDto> UpdateTableAsync(int id, UpdateTableDto dto)
    {
        var table = await _context.Tables.FindAsync(id);

        if (table == null)
            throw new KeyNotFoundException("Bordet hittades inte.");

        table.Name = dto.Name;
        table.Capacity = dto.Capacity;
        table.Placement = dto.Placement;
        table.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return new TableDto
        {
            Id = table.Id,
            Name = table.Name,
            Capacity = table.Capacity,
            Placement = table.Placement
        };
    }
}
