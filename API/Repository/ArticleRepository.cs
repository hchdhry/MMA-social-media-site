using API.Data;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;

namespace API.Repository;
public class ArticleRepository : IArticleInterface
{
    private readonly ApplicationDBContext _dbContext;
    public ArticleRepository(ApplicationDBContext context)
    {
        _dbContext = context;
    }

    public async Task<Article> CreateArticle(UpdateArticleDTO article, string user)
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

    public async Task<Article> DeleteArticle(int id, string userId)
    {
        var article = await _dbContext.Articles.FirstOrDefaultAsync(a => a.Id == id);
        if (article == null)
        {
            throw new Exception("Article not found");
        }
        if (article.UserId != userId)
        {
            throw new Exception("You are not authorized to delete this article");
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

    public async Task<List<Article>> GetArticleByUserId(string userId)
    {
        var articles =  await _dbContext.Articles.Where(a => a.UserId == userId).ToListAsync();
        return articles;
    }

    public async Task<Article> UpdateArticle(UpdateArticleDTO article, int id, string userId)
    {
        var exisitingArticle = await _dbContext.Articles.FirstOrDefaultAsync(a => a.Id == id);
        if (exisitingArticle == null)
        {
            throw new Exception("Article not found");
        }
        if (exisitingArticle.UserId != userId)
        {
            throw new Exception("You are not authorized to update this article");
        }
        exisitingArticle.Title = article.Title; 
        exisitingArticle.Content = article.Content;
        _dbContext.Articles.Update(exisitingArticle);
        await _dbContext.SaveChangesAsync();
        return exisitingArticle;
    }
}
