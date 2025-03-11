using API.Models;
using Microsoft.AspNetCore.Identity;

public class User:IdentityUser
{
    public List<Gym> Gyms { get; set; } = new List<Gym>();
    
}