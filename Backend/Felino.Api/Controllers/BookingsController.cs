using Felino.Api.DTOs.Bookings;
using Felino.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Felino.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingsController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] CreateBookingDto dto)
        {
            try
            {
                var result = await _bookingService.CreateBookingAsync(dto);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("find")]
        public async Task<IActionResult> FindBooking(FindBookingDto dto)
        {
            try
            {
                var result = await _bookingService.FindBookingAsync(dto);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpPut("cancel")]
        public async Task<IActionResult> CancelBooking(CancelBookingDto dto)
        {
            try
            {
                var result = await _bookingService.CancelBookingAsync(dto);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("update")]
        public async Task<IActionResult> UpdateBooking(UpdateBookingDto dto)
        {
            try
            {
                var result = await _bookingService.UpdateBookingAsync(dto);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("admin")]
        public async Task<IActionResult> GetBookingsByDate([FromQuery] DateOnly date)
        {
            var bookings = await _bookingService.GetBookingsByDateAsync(date);
            return Ok(bookings);
        }
    }
}