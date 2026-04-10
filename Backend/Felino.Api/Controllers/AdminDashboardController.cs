using Felino.Api.Data;
using Felino.Api.DTOs.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Felino.Api.Controllers
{
    [ApiController]
    [Route("api/admin/dashboard")]
    [Authorize(Roles = "Admin")]
    public class AdminDashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminDashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("today")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(IEnumerable<AdminTodayEventDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<IEnumerable<AdminTodayEventDto>>> GetToday()
        {
            var todayDateOnly = DateOnly.FromDateTime(DateTime.Today);
            var todayDateTime = DateTime.Today;

            var latestOrder = await _context.Orders
                .AsNoTracking()
                .Include(o => o.OrderItems)
                .OrderByDescending(o => o.CreatedAt)
                .FirstOrDefaultAsync();

            var todayBookingsCount = await _context.Bookings
                .AsNoTracking()
                .CountAsync(b => b.Date == todayDateOnly);

            var latestBookingToday = await _context.Bookings
                .AsNoTracking()
                .Where(b => b.Date == todayDateOnly)
                .OrderByDescending(b => b.CreatedAt)
                .FirstOrDefaultAsync();

            var latestProduct = await _context.Products
                .AsNoTracking()
                .OrderByDescending(p => p.Id)
                .FirstOrDefaultAsync();

            var activeCampaign = await _context.Campaigns
                .AsNoTracking()
                .Where(c => c.StartDate.Date <= todayDateTime && c.EndDate.Date >= todayDateTime)
                .OrderByDescending(c => c.StartDate)
                .FirstOrDefaultAsync();

            var latestCampaign = await _context.Campaigns
                .AsNoTracking()
                .OrderByDescending(c => c.Id)
                .FirstOrDefaultAsync();

            var campaignToShow = activeCampaign ?? latestCampaign;

            var result = new List<AdminTodayEventDto>
            {
                new AdminTodayEventDto
                {
                    Label = "Ordrar",
                    Text = latestOrder != null
                        ? "Ny order inkom från hemleverans."
                        : "Inga ordrar ännu.",
                    Meta = latestOrder != null
                        ? $"Order #{latestOrder.Id} - Total {latestOrder.Total:0.##} kr."
                        : "Ingen order registrerad än.",
                    Route = "/admin/orders",
                    Variant = "orders"
                },
                new AdminTodayEventDto
                {
                    Label = "Bokningar",
                    Text = todayBookingsCount > 0
                        ? "Ny bokning registrerad för idag."
                        : "Inga bokningar registrerade för idag.",
                    Meta = latestBookingToday != null
                        ? $"{todayBookingsCount} bokningar ligger just nu inlagda. Senaste: kl {latestBookingToday.Time:HH\\:mm}."
                        : $"{todayBookingsCount} bokningar ligger just nu inlagda.",
                    Route = "/admin/booking",
                    Variant = "booking"
                },
                new AdminTodayEventDto
                {
                    Label = "Produkter",
                    Text = latestProduct != null
                        ? $"Produkten \"{latestProduct.Name}\" har lagts till."
                        : "Ingen produkt har lagts till ännu.",
                    Meta = latestProduct != null
                        ? "Senaste ändringen gjordes i menyn."
                        : "Ingen produktändring registrerad.",
                    Route = "/admin/products",
                    Variant = "products"
                },
                new AdminTodayEventDto
                {
                    Label = "Kampanjer",
                    Text = campaignToShow != null
                        ? $"Ny kampanj skapad: {campaignToShow.Title}."
                        : "Ingen kampanj finns just nu.",
                    Meta = activeCampaign != null
                        ? "Kampanjen är aktiv just nu."
                        : campaignToShow != null
                            ? $"Gäller {campaignToShow.StartDate:yyyy-MM-dd} - {campaignToShow.EndDate:yyyy-MM-dd}."
                            : "Ingen aktiv kampanj just nu.",
                    Route = "/admin/campaigns",
                    Variant = "campaigns"
                }
            };

            return Ok(result);
        }

        [HttpGet("notices")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(IEnumerable<AdminNoticeDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<IEnumerable<AdminNoticeDto>>> GetNotices()
        {
            var today = DateOnly.FromDateTime(DateTime.Today);
            var tomorrow = DateTime.Today.AddDays(1);

            var notices = new List<AdminNoticeDto>();

            var recentOrders = await _context.Orders
                .AsNoTracking()
                .OrderByDescending(o => o.CreatedAt)
                .Take(3)
                .ToListAsync();

            notices.AddRange(recentOrders.Select(o => new AdminNoticeDto
            {
                Id = 100000 + o.Id,
                Type = "order",
                Text = $"Ny beställning från {o.CustomerName}",
                To = "/admin/orders"
            }));

            var recentBookings = await _context.Bookings
                .AsNoTracking()
                .Where(b => b.Date == today)
                .OrderByDescending(b => b.CreatedAt)
                .Take(3)
                .ToListAsync();

            notices.AddRange(recentBookings.Select(b => new AdminNoticeDto
            {
                Id = 200000 + b.Id,
                Type = "booking",
                Text = $"Ny bordsbokning för {b.NumberOfGuests} personer kl. {b.Time:HH\\:mm}",
                To = "/admin/booking"
            }));

            var activeCampaigns = await _context.Campaigns
                .AsNoTracking()
                .Where(c => c.StartDate.Date <= DateTime.Today && c.EndDate.Date >= DateTime.Today)
                .OrderByDescending(c => c.StartDate)
                .Take(2)
                .ToListAsync();

            notices.AddRange(activeCampaigns.Select(c => new AdminNoticeDto
            {
                Id = 300000 + c.Id,
                Type = "campaign",
                Text = $"Kampanjen {c.Title} är aktiv nu",
                To = "/admin/campaigns"
            }));

            var upcomingCampaigns = await _context.Campaigns
                .AsNoTracking()
                .Where(c => c.StartDate >= DateTime.Today && c.StartDate < tomorrow)
                .OrderBy(c => c.StartDate)
                .Take(2)
                .ToListAsync();

            notices.AddRange(upcomingCampaigns.Select(c => new AdminNoticeDto
            {
                Id = 400000 + c.Id,
                Type = "campaign",
                Text = $"Kampanjen {c.Title} startar idag",
                To = "/admin/campaigns"
            }));

            var orderedNotices = notices
                .Take(10)
                .ToList();

            return Ok(orderedNotices);
        }
    }
}