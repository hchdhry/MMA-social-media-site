using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class StatsController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public StatsController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet("admin-dashboard")]
        public async Task<IActionResult> GetAdminStats()
        {
            var totalUsers = await _context.Users.CountAsync();
            var totalArticles = await _context.Articles.CountAsync();

            var topAuthor = await _context.Users
                .Select(u => new
                {
                    u.UserName,
                    ArticleCount = _context.Articles.Count(a => a.UserId == u.Id)
                })
                .OrderByDescending(u => u.ArticleCount)
                .FirstOrDefaultAsync();

            var recentUsers = await _context.Users
                .OrderByDescending(u => u.Id) // Assuming Id is sequential
                .Select(u => new { u.UserName, u.Email })
                .Take(5)
                .ToListAsync();

            var recentEvents = await _context.Events
                .OrderByDescending(e => e.Id)
                .Select(e => new { e.Id, e.Name, e.Date })
                .Take(5)
                .ToListAsync();

            var topFighters = await _context.Fighters
                .Select(f => new
                {
                    f.Id,
                    f.Name,
                    CommentCount = _context.Comments.Count(c => c.FighterId == f.Id)
                })
                .OrderByDescending(f => f.CommentCount)
                .Take(5)
                .ToListAsync();

            return Ok(new
            {
                TotalUsers = totalUsers,
                TotalArticles = totalArticles,
                TopAuthor = topAuthor,
                RecentUsers = recentUsers,
                RecentEvents = recentEvents,
                TopFighters = topFighters
            });
        }
    }
}
