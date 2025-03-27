using API.Models;
namespace API.Interfaces;
public interface IEventRepository
{
    Task<Events> GetEventById(int id);
    Task<IEnumerable<Events>> GetAllEvents();
    Task<Events> CreateEvent(Events events);
    Task<Events> UpdateEvent(Events events);
    Task<bool> DeleteEvent(int id);
}
