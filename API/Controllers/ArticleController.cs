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
        [HttpGet]
        public async Task<IActionResult> GetAllArticles()
        {
            var articles = await _articleRepository.GetAllArticles();
            return Ok(articles);
        }
        [HttpGet("getbyuser")]
        public async Task<IActionResult> GetArticleByUserId()
        {
            var userName = HttpContext.User.getUserName();
            var user = await _userManager.FindByNameAsync(userName);

            var articles = await _articleRepository.GetArticleByUserId(user.Id);
            return Ok(articles);
        }
        [HttpPut]
        [Authorize]
        [Route("update/{id}")]
        public async Task<IActionResult> UpdateArticle([FromBody] UpdateArticleDTO article, int id)
        {
            var userName = HttpContext.User.getUserName();
            var user = await _userManager.FindByNameAsync(userName);
            await _articleRepository.UpdateArticle(article, id,user.Id);
            return Ok(article);
        }
        [HttpDelete]
        [Authorize]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteArticle(int id)
        {
            var userName = HttpContext.User.getUserName();
            var user = await _userManager.FindByNameAsync(userName);
            await _articleRepository.DeleteArticle(id, user.Id);
            return Ok("Article deleted successfully");
        }
        

    }
}
