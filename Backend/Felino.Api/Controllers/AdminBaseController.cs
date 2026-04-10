using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Felino.Api.Controllers
{
    [ApiController]
    [Authorize(Roles = "Admin")]
    public abstract class AdminBaseController : ControllerBase
    {
    }
}