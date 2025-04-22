using API.DTO.Comments;
using API.Models;
public interface ICommentRepository
{
    Task<Comment> GetCommentById(int id);
    Task<IEnumerable<CommentDTO>> GetCommentsByFighterId(int fighterId);
    Task<Comment> CreateComment(CreateCommentDTO comment, int fighterId,string userName);
    Task<Comment> UpdateComment(Comment comment);
    Task<Comment> DeleteComment(int id);
}