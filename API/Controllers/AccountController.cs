using API.DTO;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Services;
using API.Interfaces;

namespace API.Controllers
{

    [ApiController]
    [Route("api/Account")]
    public class AccountController : ControllerBase
    {

        private readonly IEmailSender _emailSender;
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _TokenService;
        private readonly SignInManager<User> _SignInManager;

        public AccountController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signInManager,IEmailSender emailSender)
        {
            _emailSender = emailSender;
            _userManager = userManager;
            _TokenService = tokenService;
            _SignInManager = signInManager;

        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid request");

                }
                var appUser = new User
                {
                    Email = registerDto.Email,
                    UserName = registerDto.Username,
                };

                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);
                if (createdUser.Succeeded)
                {
                    var role = await _userManager.AddToRoleAsync(appUser, "USER");
                    if (role.Succeeded)
                    {
                        string emailBody = $"Hello {appUser.UserName}, 🎉We're excited to have you on board.You’ve successfully created your account, and you’re now part of a growing community focused on connecting fight fans";
                        string emailTitle = "Welcome to The FightClub 🎉!";
                        await _emailSender.SendEmailAsync(appUser.Email,emailTitle,emailBody);

                        return Ok(new NewUserDto
                        {
                            UserName = appUser.UserName,
                            Email = appUser.Email,
                            token = _TokenService.CreateToken(appUser)
                        });
                    }
                    else { return BadRequest(); }
                }

                else { return StatusCode(500, createdUser.Errors); }



            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }


        }
        [HttpPost("login")]
        public async Task<IActionResult> LogIn(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.UserName);
            if (user == null)
            {
                return Unauthorized("invalid username");
            }
            var result = await _SignInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
            {
                return NotFound("incorrect credentials");
            }
            return Ok(new NewUserDto
            {
                UserName = user.UserName,
                Email = user.Email,
                token = _TokenService.CreateToken(user)
            });


        }

    }
}