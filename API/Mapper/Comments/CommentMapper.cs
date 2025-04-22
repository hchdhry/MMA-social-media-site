using API.DTO.Comments;
using API.Models;

public static class CommentMapper
{
    public static CommentDTO ToCommentDTO(this Comment comment)
    {
        return new CommentDTO
        {
            Id = comment.Id,
            Title = comment.Title,
            Text = comment.Text,
            FighterId = comment.FighterId,
            CreatedAt = comment.CreatedAt,
            UserName = comment.UserName
        };
    }
    public static CreateCommentDTO ToCreateCommentDTO(this Comment comment)
    {
        return new CreateCommentDTO
        {
            Title = comment.Title,
            Text = comment.Text
        };

    }
}