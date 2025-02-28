namespace API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

public class ApplicationDBContext : DbContext
{
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
    {
    }

    public DbSet<Fighter> Fighters { get; set; } 
    public DbSet<Comment> Comments { get; set; }
   
}

