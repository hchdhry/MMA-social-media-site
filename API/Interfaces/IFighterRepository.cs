using API.DTO.Fighter;
using API.Models;
namespace API.Interfaces;
public interface IFighterRepository
{
    public Task<List<FighterDTO>> GetFighters(QueryObject query);
    public Task<Fighter> GetFighterByID(int id);
    public Task<Fighter> CreateFighter(UpdateFighterDTO fighter);
    public Task<Fighter> UpdateFighter(int id, UpdateFighterDTO fighter);
    public Task<Fighter> DeleteFighter(int id);
}