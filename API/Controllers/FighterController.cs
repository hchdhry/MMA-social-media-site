using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FighterController:ControllerBase
{
    private readonly IFighterRepository _fighterRepository;
    public FighterController(IFighterRepository fighterRepository)
    {
        _fighterRepository = fighterRepository;
        
    }
    [HttpPost]
    public async Task<IActionResult> CreateFighter([FromBody] UpdateFighterDTO fighterDto)
    {
        var fighter = await _fighterRepository.CreateFighter(fighterDto);
        if (fighter == null)
        {
            return BadRequest("Something went wrong");
        }

        return Ok(fighter);
    }
    

}