using Felino.Api.Data;
using Felino.Api.Domain.Entities;
using Felino.Api.Dtos.Campaigns;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Felino.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CampaignsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CampaignsController(AppDbContext context)
        {
            _context = context;
        }

      
        // PUBLIC (KUND)
  

        // GET: api/campaigns
        [AllowAnonymous]
        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(typeof(IEnumerable<CampaignDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<CampaignDto>>> GetAll()
        {
            var campaigns = await _context.Campaigns
                .AsNoTracking()
                .OrderBy(c => c.StartDate)
                .Select(c => new CampaignDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    Body = c.Body,
                    ImageUrl = c.ImageUrl,
                    AltText = c.AltText,
                    StartDate = c.StartDate,
                    EndDate = c.EndDate
                })
                .ToListAsync();

            return Ok(campaigns);
        }

        // GET: api/campaigns/5
        [AllowAnonymous]
        [HttpGet("{id:int}")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(CampaignDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CampaignDto>> GetById(int id)
        {
            var campaign = await _context.Campaigns
                .AsNoTracking()
                .Where(c => c.Id == id)
                .Select(c => new CampaignDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    Body = c.Body,
                    ImageUrl = c.ImageUrl,
                    AltText = c.AltText,
                    StartDate = c.StartDate,
                    EndDate = c.EndDate
                })
                .FirstOrDefaultAsync();

            if (campaign == null)
            {
                return NotFound(new
                {
                    message = $"Campaign med id {id} hittades inte."
                });
            }

            return Ok(campaign);
        }

        // GET: api/campaigns/active
        [AllowAnonymous]
        [HttpGet("active")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(IEnumerable<CampaignDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<CampaignDto>>> GetActive()
        {
            var today = DateTime.UtcNow.Date;

            var activeCampaigns = await _context.Campaigns
                .AsNoTracking()
                .Where(c => c.StartDate.Date <= today && c.EndDate.Date >= today)
                .OrderBy(c => c.StartDate)
                .Select(c => new CampaignDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    Body = c.Body,
                    ImageUrl = c.ImageUrl,
                    AltText = c.AltText,
                    StartDate = c.StartDate,
                    EndDate = c.EndDate
                })
                .ToListAsync();

            return Ok(activeCampaigns);
        }

    
        // ADMIN ONLY
       
        // POST: api/campaigns
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(CampaignDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<CampaignDto>> Create([FromBody] CreateCampaignDto dto)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            if (dto.EndDate < dto.StartDate)
            {
                return BadRequest(new
                {
                    message = "EndDate kan inte vara tidigare än StartDate."
                });
            }

            var campaign = new Campaign
            {
                Title = dto.Title?.Trim() ?? string.Empty,
                Body = dto.Body?.Trim() ?? string.Empty,
                ImageUrl = string.IsNullOrWhiteSpace(dto.ImageUrl) ? null : dto.ImageUrl.Trim(),
                AltText = string.IsNullOrWhiteSpace(dto.AltText) ? null : dto.AltText.Trim(),
                StartDate = dto.StartDate,
                EndDate = dto.EndDate
            };

            _context.Campaigns.Add(campaign);
            await _context.SaveChangesAsync();

            var result = new CampaignDto
            {
                Id = campaign.Id,
                Title = campaign.Title,
                Body = campaign.Body,
                ImageUrl = campaign.ImageUrl,
                AltText = campaign.AltText,
                StartDate = campaign.StartDate,
                EndDate = campaign.EndDate
            };

            return CreatedAtAction(nameof(GetById), new { id = campaign.Id }, result);
        }

        // PUT: api/campaigns/5
        [Authorize(Roles = "Admin")]
        [HttpPut("{id:int}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateCampaignDto dto)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            if (dto.EndDate < dto.StartDate)
            {
                return BadRequest(new
                {
                    message = "EndDate kan inte vara tidigare än StartDate."
                });
            }

            var campaign = await _context.Campaigns.FindAsync(id);

            if (campaign == null)
            {
                return NotFound(new
                {
                    message = $"Campaign med id {id} hittades inte."
                });
            }

            campaign.Title = dto.Title?.Trim() ?? string.Empty;
            campaign.Body = dto.Body?.Trim() ?? string.Empty;
            campaign.ImageUrl = string.IsNullOrWhiteSpace(dto.ImageUrl) ? null : dto.ImageUrl.Trim();
            campaign.AltText = string.IsNullOrWhiteSpace(dto.AltText) ? null : dto.AltText.Trim();
            campaign.StartDate = dto.StartDate;
            campaign.EndDate = dto.EndDate;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/campaigns/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> Delete(int id)
        {
            var campaign = await _context.Campaigns.FindAsync(id);

            if (campaign == null)
            {
                return NotFound(new
                {
                    message = $"Campaign med id {id} hittades inte."
                });
            }

            _context.Campaigns.Remove(campaign);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}