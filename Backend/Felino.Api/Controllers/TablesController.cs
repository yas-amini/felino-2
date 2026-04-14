using Felino.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Felino.Api.DTOs.Tables;

namespace Felino.Api.Controllers;

[ApiController]
[Route("api/admin/tables")]
public class AdminTablesController : ControllerBase
{
    private readonly ITableService _tableService;

    public AdminTablesController(ITableService tableService)
    {
        _tableService = tableService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _tableService.GetAllTablesAsync();
        return Ok(result);
    }
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTableDto dto)
    {
        var result = await _tableService.CreateTableAsync(dto);
        return Ok(result);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateTableDto dto)
    {
        try
        {
            var result = await _tableService.UpdateTableAsync(id, dto);
            return Ok(result);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }

}
