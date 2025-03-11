using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;
[Table("Gym")]
public class Gym
{
    public User user { get; set; }
    public string UserId { get; set; }
    public string Fighter { get; set; }
    public int FighterId { get; set; }
}