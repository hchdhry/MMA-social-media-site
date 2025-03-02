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
