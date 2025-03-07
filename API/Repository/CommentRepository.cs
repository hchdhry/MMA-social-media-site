using API.Data;
using API.DTO.Comments;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;
public class CommentRepository : ICommentRepository
{
    private readonly ApplicationDBContext _DBcontext;
    public CommentRepository(ApplicationDBContext context)
    {
        _DBcontext = context;
        
    }
    public async Task<Comment> CreateComment(CreateCommentDTO comment, int fighterId)
    {
        var newComment = new Comment
        {
            FighterId = fighterId,
            Text = comment.Text,
            CreatedAt = DateTime.UtcNow,
            Title = comment.Title

        };
       await _DBcontext.Comments.AddAsync(newComment);
        await _DBcontext.SaveChangesAsync();
        return newComment;
    }

    public Task<Comment> DeleteComment(int id)
    {
        throw new NotImplementedException();
    }

    public Task<Comment> GetCommentById(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<CommentDTO>> GetCommentsByFighterId(int fighterId)
    {
        var comments = await _DBcontext.Comments.Where(c => c.FighterId == fighterId).ToListAsync();
        var commentDTOS = comments.Select(c => c.ToCommentDTO()).ToList();
        return commentDTOS;

    }

    public Task<Comment> UpdateComment(Comment comment)
    {
        throw new NotImplementedException();
    }
}