using API.Models;
public interface ICommentRepository
{
    Task<Comment> GetCommentById(int id);
    Task<IEnumerable<Comment>> GetCommentsByFighterId(int fighterId);
    Task<Comment> CreateComment(Comment comment);
    Task<Comment> UpdateComment(Comment comment);
    Task<Comment> DeleteComment(int id);
}