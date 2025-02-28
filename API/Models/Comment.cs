
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{

    [Table("Comments")]
    public class Comment
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
       
        public  Fighter Fighter { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        


    }
}