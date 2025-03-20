using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{

    [Table("Comments")]
    public class Comment
    {
        public int Id { get; set; }
       // public User user { get; set; }
       // public int UserId { get; set; }

        public string Title { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public int FighterId { get; set; }
        public Fighter fighter { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


    }
}