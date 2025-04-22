using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTO.Comments;

    public class CommentDTO
    {
        public int Id { get; set; }
        //public string username { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public int FighterId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


    }
