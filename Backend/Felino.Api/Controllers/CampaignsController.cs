using Felino.Api.Data;
using Felino.Api.Domain.Entities;
using Felino.Api.Dtos.Campaigns;
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

        // GET: api/campaigns
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CampaignDto>>> GetAll()
        {
            var campaigns = await _context.Campaigns
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
        [HttpGet("{id}")]
        public async Task<ActionResult<CampaignDto>> GetById(int id)
        {
            var campaign = await _context.Campaigns
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
                return NotFound(new { message = $"Campaign med id {id} hittades inte." });
            }

            return Ok(campaign);
        }

        // GET: api/campaigns/active
        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<CampaignDto>>> GetActive()
        {
            var today = DateTime.UtcNow.Date;

            var activeCampaigns = await _context.Campaigns
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

        // POST: api/campaigns
        [HttpPost]
        public async Task<ActionResult<CampaignDto>> Create([FromBody] CreateCampaignDto dto)
        {
            if (dto.EndDate < dto.StartDate)
            {
                return BadRequest(new { message = "EndDate kan inte vara tidigare än StartDate." });
            }

            var campaign = new Campaign
            {
                Title = dto.Title,
                Body = dto.Body,
                ImageUrl = dto.ImageUrl,
                AltText = dto.AltText,
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
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateCampaignDto dto)
        {
            if (dto.EndDate < dto.StartDate)
            {
                return BadRequest(new { message = "EndDate kan inte vara tidigare än StartDate." });
            }

            var campaign = await _context.Campaigns.FindAsync(id);

            if (campaign == null)
            {
                return NotFound(new { message = $"Campaign med id {id} hittades inte." });
            }

            campaign.Title = dto.Title;
            campaign.Body = dto.Body;
            campaign.ImageUrl = dto.ImageUrl;
            campaign.AltText = dto.AltText;
            campaign.StartDate = dto.StartDate;
            campaign.EndDate = dto.EndDate;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/campaigns/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var campaign = await _context.Campaigns.FindAsync(id);

            if (campaign == null)
            {
                return NotFound(new { message = $"Campaign med id {id} hittades inte." });
            }

            _context.Campaigns.Remove(campaign);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}