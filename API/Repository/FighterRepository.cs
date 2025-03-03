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
    public async Task<Fighter> CreateFighter(UpdateFighterDTO fighterDto)
    {
        var fighter = new Fighter
        {
            Name = fighterDto.Name,
            Wins = fighterDto.Wins,
            Losses = fighterDto.Losses,
            Height = fighterDto.Height,
            Weight = fighterDto.Weight,
            Reach = fighterDto.Reach,
            Stance = fighterDto.Stance,
            Age = fighterDto.Age,
            SignificantStrikesLandedPerMinute = fighterDto.SignificantStrikesLandedPerMinute,
            SignificantStrikeAccuracy = fighterDto.SignificantStrikeAccuracy,
            StrikesAbsorbedPerMinute = fighterDto.StrikesAbsorbedPerMinute,
            StrikeDefense = fighterDto.StrikeDefense,
            TakedownAverage = fighterDto.TakedownAverage,
            TakedownAccuracy = fighterDto.TakedownAccuracy,
            TakedownDefense = fighterDto.TakedownDefense,
            SubmissionAverage = fighterDto.SubmissionAverage
        };

        await _dbContext.Fighters.AddAsync(fighter);
        await _dbContext.SaveChangesAsync();

        return fighter;
    }

    public async Task<Fighter?> DeleteFighter(int id)
    {
        var fighter = await _dbContext.Fighters.FirstOrDefaultAsync(f => f.Id == id);
        if (fighter == null)
        {
            return null;
        }
        _dbContext.Fighters.Remove(fighter);
        await _dbContext.SaveChangesAsync();
        return fighter;
    }

    public async Task<Fighter> GetFighterByID(int id)
    {
       return await _dbContext.Fighters.FirstOrDefaultAsync(f => f.Id == id);
    }

    public Task<List<Fighter>> GetFighters(QueryObject query)
    {
        IQueryable<Fighter> fighters = _dbContext.Fighters;
        if(!string.IsNullOrEmpty(query.NameQuery))
        {
            fighters = fighters.Where(f=>f.Name.ToLower().StartsWith(query.NameQuery.ToLower()));
        }
        int skipnumber = (query.PageNumber-1) * query.PageSize;
        fighters = fighters.Skip(skipnumber).Take(query.PageSize);
        return fighters.ToListAsync();
        
    }

    public Task<Fighter> UpdateFighter(int id, UpdateFighterDTO fighter)
    {
        throw new NotImplementedException();
    }
}
