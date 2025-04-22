using API.Data;
using API.DTO.Comments;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using API.Extensions;

namespace API.Repository;

public class CommentRepository : ICommentRepository
{
    private readonly ApplicationDBContext _DBcontext;

    public CommentRepository(ApplicationDBContext context)
    {
        _DBcontext = context;
       

    }
    public async Task<Comment> CreateComment(CreateCommentDTO comment, int fighterId,string userName)
    {
     
        var newComment = new Comment
        {
            FighterId = fighterId,
            Text = comment.Text,
            CreatedAt = DateTime.UtcNow,
            UserName = userName,
            Title = comment.Title

        };
       await _DBcontext.Comments.AddAsync(newComment);
        await _DBcontext.SaveChangesAsync();
        return newComment;
    }

    public async Task<Comment> DeleteComment(int id)
    {
        var Comment = await _DBcontext.Comments.FirstOrDefaultAsync(c => c.Id == id);
        if (Comment == null)
        {
            return null;
        }
        _DBcontext.Comments.Remove(Comment);
        await _DBcontext.SaveChangesAsync();
        return Comment;
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