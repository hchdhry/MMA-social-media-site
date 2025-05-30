using System;
using API.Data;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;
namespace API.Repository;

public class GymRepository : IGymRepository
{
    private readonly ApplicationDBContext _dbContext;
    public GymRepository(ApplicationDBContext dBContext)
    {
        _dbContext = dBContext;
    }
    public async Task<Gym> CreateGym(Gym gym)
    {
        await _dbContext.Gyms.AddAsync(gym);
        await _dbContext.SaveChangesAsync();
        return gym;
       
    }

    public async Task<Gym> DeleteGym(Gym gym)
    {
        _dbContext.Gyms.Remove(gym);
        await _dbContext.SaveChangesAsync();
        return gym;
    }

    public async Task<List<Gym>> GetAllGymsByUserId(string UserId)
    {
        var gyms = await  _dbContext.Gyms.Where(g=>g.UserId == UserId).Include(g=>g.Fighter).ToListAsync();
        return gyms;
    }
    public async Task<Gym> GetGymByFighterId(Gym gym)
    {
        var gymModel = await _dbContext.Gyms.FirstOrDefaultAsync(g=>g.FighterId == gym.FighterId && g.UserId == gym.UserId);
        return gym;
    }
}

