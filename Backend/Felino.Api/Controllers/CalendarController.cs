using Microsoft.AspNetCore.Mvc;
using Felino.Api.Services.Interfaces;

namespace Felino.Api.Controllers;

[ApiController]
[Route("api/admin/bookings")]
public class AdminCalendarController : ControllerBase

{
    private readonly IBookingService _bookingService;

    public AdminCalendarController(IBookingService bookingService)
    {
        _bookingService = bookingService;
    }

    [HttpGet("overview")]
    public async Task<IActionResult> GetBookingsOverviewByDate([FromQuery] DateOnly date)
    {
        var result = await _bookingService.GetBookingsOverviewByDateAsync(date);
        return Ok(result);
    }
}
