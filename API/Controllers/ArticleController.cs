using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Extensions;
using API.Repository;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleInterface _articleRepository;
        private readonly UserManager<User> _userManager;
        public ArticleController(IArticleInterface articleRepository, UserManager<User> userManager)
        {
            _articleRepository = articleRepository;
            _userManager = userManager;
        }
        [HttpPost]
        [Authorize]
        [Route("create")]
        public async Task<IActionResult> CreateArticle([FromBody] UpdateArticleDTO article)
        {
            var userName = HttpContext.User.getUserName();
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return NotFound("User not found");
            }
            await _articleRepository.CreateArticle(article, user.Id);
            return Ok(article);
        }
        
    }
}
