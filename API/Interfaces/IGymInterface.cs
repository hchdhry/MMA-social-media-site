using System;
using API.Models;

namespace API.Interfaces;

public interface IGymRepository
{
    public Task<List<Gym>> GetAllGymsByUserId();
    public Task<Gym> CreateGym(Gym gym);
    public Task<Gym> DeleteGym(Gym gym);

}
