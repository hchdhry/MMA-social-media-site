namespace API.Data;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDBContext : IdentityDbContext<User>
{
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
    {
    }

    public DbSet<Fighter> Fighters { get; set; } 
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Events> Events { get; set; }
    public DbSet<UserConnection> UserConnections { get; set; }
    public DbSet<Gym> Gyms { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<UserConnection>()
            .HasKey(uc => uc.ConnectionId);
        builder.Entity<Gym>().HasKey(g => new { g.UserId, g.FighterId });
        builder.Entity<Gym>().HasOne(g => g.user).WithMany(u => u.Gyms).HasForeignKey(g => g.UserId); 

    
        List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                },
            };
        
        builder.Entity<IdentityRole>().HasData(roles);
    }



}

