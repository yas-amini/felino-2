using Felino.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

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
}
