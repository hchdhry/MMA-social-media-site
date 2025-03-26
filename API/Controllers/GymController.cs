using API.Extensions;
using API.Interfaces;
using API.Models;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GymController : ControllerBase
    {
        private readonly IGymRepository _gymRepository;
        private readonly UserManager<User> _userManager;
        private readonly IFighterRepository _fighterRepository;
        public GymController(IGymRepository gymRepository, UserManager<User> userManager, IFighterRepository fighterRepository)
        {
            _userManager = userManager;
            _gymRepository = gymRepository;
            _fighterRepository = fighterRepository;
        }
        
        [HttpPost("create")]
        
        public async Task<IActionResult> CreateGym(int fighterId)
        {
            var userName = HttpContext.User.getUserName();
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null) 
            {
                return NotFound("User not found");
            }
            var fighter = await _fighterRepository.GetFighterByID(fighterId);
            if (fighter == null)
            {
                return NotFound("Fighter not found");
            }
            var gym = new Gym
            {
                UserId = user.Id,
                FighterId = fighter.Id
            };
            await _gymRepository.CreateGym(gym);
            return Ok(gym);

        }
        [HttpDelete("delete")]
        [Authorize]
        public async Task<IActionResult> DeleteGym(int FighterId)
        {
            var userName = HttpContext.User.getUserName();
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var fighter = await _fighterRepository.GetFighterByID(FighterId);
            if (fighter == null)
            {
                return NotFound("Fighter not found");
            }
            var gym = new Gym
            {
                UserId = user.Id,
                FighterId = fighter.Id
            };
            await _gymRepository.DeleteGym(gym);
            return Ok(gym);

        }
        [HttpGet("getall")]
        [Authorize]
        public async Task<IActionResult> GetAllGymsByUserId()
        {
            var gyms = await _gymRepository.GetAllGymsByUserId();
            return Ok(gyms);
        }
    }
}
