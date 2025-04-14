using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;
public class ArticleRepository : IArticleInterface
{
    private readonly ApplicationDBContext _dbContext;
    public ArticleRepository(ApplicationDBContext context)
    {
        _dbContext = context;
    }

    public async Task<Article> CreateArticle(Article article, int user)
    {
       Article newArticle = new Article
        {
            Title = article.Title,
            Content = article.Content,
            UserId = user,
            CreatedAt = DateTime.UtcNow
        };
        await _dbContext.Articles.AddAsync(newArticle);
        await _dbContext.SaveChangesAsync();
        return newArticle;
    }

    public async Task<Article> DeleteArticle(int id)
    {
        var article = await _dbContext.Articles.FirstOrDefaultAsync(a => a.Id == id);
        if (article == null)
        {
            throw new Exception("Article not found");
        }
        _dbContext.Articles.Remove(article);
        _dbContext.SaveChangesAsync();
        return article;
    }

    public async Task<List<Article>> GetAllArticles()
    {
        var articles = await _dbContext.Articles.ToListAsync();
        return articles;
    }

    public async Task<List<Article>> GetArticleByUserId(int id)
    {
        var articles =  await _dbContext.Articles.Where(a => a.UserId == id).ToListAsync();
        return articles;
    }

    public async Task<Article> UpdateArticle(UpdateArticleDTO article)
    {
        var exisitingArticle = await _dbContext.Articles.FirstOrDefaultAsync(a => a.Id == article.Id);
        if (exisitingArticle == null)
        {
            throw new Exception("Article not found");
        }
        exisitingArticle.Title = article.Title; 
        exisitingArticle.Content = article.Content;
        return exisitingArticle;
    }
}
