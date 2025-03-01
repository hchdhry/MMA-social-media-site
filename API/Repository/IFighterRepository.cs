using API.Models;

public interface IFighterRepository
{

    Task<Fighter> GetFighter(int id);
    
    Task<Fighter> CreateFighter(string name);
    Task<Fighter> DeleteFighter(int id);
   
}



