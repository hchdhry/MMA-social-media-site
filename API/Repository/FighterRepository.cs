using API.Data;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;
public class FighterRepository : IFighterRepository
{
    private readonly ApplicationDBContext _dbContext;
    public FighterRepository(ApplicationDBContext applicationDBContext)
    {
        _dbContext = applicationDBContext;
        
    }
    public Task<Fighter> CreateFighter(Fighter fighter)
    {
        throw new NotImplementedException();
    }

    public Task<Fighter> DeleteFighter(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<Fighter> GetFighterByID(int id)
    {
       return await _dbContext.Fighters.FirstOrDefaultAsync(f => f.Id == id);
    }

    public Task<List<Fighter>> GetFighters()
    {
        throw new NotImplementedException();
    }

    public Task<Fighter> UpdateFighter(int id, UpdateFighterDTO fighter)
    {
        throw new NotImplementedException();
    }
}
