namespace API.Interfaces;
public interface IArticleInterface
{
    Task<List<Article>> GetAllArticles();
    Task<List<Article>> GetArticleByUserId(string userId);
    Task<Article> CreateArticle(UpdateArticleDTO article, string userId);
    Task<Article> UpdateArticle(UpdateArticleDTO article,int id,string userId);
    Task<Article> DeleteArticle(int id, string userId);
}