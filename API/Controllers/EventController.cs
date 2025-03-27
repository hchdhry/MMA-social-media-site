using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class EventController : ControllerBase
{
    private readonly IEventRepository _eventRepository;

    public EventController(IEventRepository eventRepository)
    {
        _eventRepository = eventRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllEvents()
    {
        var events = await _eventRepository.GetAllEvents();
        return Ok(events);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetEventById(int id)
    {
        var eventItem = await _eventRepository.GetEventById(id);
        if (eventItem == null)
        {
            return NotFound();
        }
        return Ok(eventItem);
    }

    [HttpPost]
    public async Task<IActionResult> CreateEvent([FromBody] Events events)
    {
        var createdEvent = await _eventRepository.CreateEvent(events);
        return CreatedAtAction(nameof(GetEventById), new { id = createdEvent.Id }, createdEvent);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEvent(int id, [FromBody] Events events)
    {
        if (id != events.Id)
        {
            return BadRequest("Event ID mismatch");
        }
        var updatedEvent = await _eventRepository.UpdateEvent(events);
        if (updatedEvent == null)
        {
            return NotFound();
        }
        return Ok(updatedEvent);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        var result = await _eventRepository.DeleteEvent(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }
}