public interface IArticleInterface
{
    Task<List<Article>> GetAllArticles();
    Task<List<Article>> GetArticleByUserId(int id);
    Task<Article> CreateArticle(Article article, int userId);
    Task<Article> UpdateArticle(UpdateArticleDTO article);
    Task<Article> DeleteArticle(int id);
}