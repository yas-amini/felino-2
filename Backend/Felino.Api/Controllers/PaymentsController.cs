using Felino.Api.DTOs.Payments;
using Felino.Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Felino.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> ProcessPayment(ProcessPaymentDto dto)
        {
            try
            {
                var result = await _paymentService.ProcessPaymentAsync(dto);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("order/{orderId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetStatus(int orderId)
        {
            var result = await _paymentService.GetPaymentByOrderIdAsync(orderId);
            if (result == null) return NotFound();
            return Ok(result);
        }
    }
}
