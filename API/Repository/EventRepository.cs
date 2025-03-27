using API.Data;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;
namespace API.Repository;

public class EventRepository : IEventRepository
{
    private readonly ApplicationDBContext _dbContext;

    public EventRepository(ApplicationDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Events> CreateEvent(Events events)
    {
        await _dbContext.Set<Events>().AddAsync(events);
        await _dbContext.SaveChangesAsync();
        return events;
    }

    public async Task<bool> DeleteEvent(int id)
    {
        var eventToDelete = await _dbContext.Set<Events>().FindAsync(id);
        if (eventToDelete == null)
        {
            return false;
        }
        _dbContext.Set<Events>().Remove(eventToDelete);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Events>> GetAllEvents()
    {
        return await _dbContext.Set<Events>().ToListAsync();
    }

    public async Task<Events> GetEventById(int id)
    {
        return await _dbContext.Set<Events>().FindAsync(id);
    }

    public async Task<Events> UpdateEvent(Events events)
    {
        var existingEvent = await _dbContext.Set<Events>().FindAsync(events.Id);
        if (existingEvent == null)
        {
            return null;
        }
        existingEvent.Name = events.Name;
        existingEvent.Date = events.Date;
        await _dbContext.SaveChangesAsync();
        return existingEvent;
    }}