using API.Interfaces;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using API.Extensions;
using Sprache;
using Microsoft.AspNetCore.Identity;

[ApiController]
[Microsoft.AspNetCore.Authorization.Authorize]
[Route("api/[controller]")]
public class CommentController:ControllerBase
{
    private readonly ICommentRepository _commentRepository;
    private readonly UserManager<User> _userManager;
    private readonly IFighterRepository _fighterRepository;
    public CommentController(ICommentRepository commentRepository,IFighterRepository fighterRepository, UserManager<User> userManager)
    {
        _commentRepository = commentRepository;
        _fighterRepository = fighterRepository;
        _userManager = userManager;
    }
    [HttpGet]
    [Route("{fighterId}")]

    public async Task<IActionResult> GetCommentsByFighterId([FromRoute]int fighterId)
    {
        var comments = await _commentRepository.GetCommentsByFighterId(fighterId);
        if (comments == null)
        {
            return BadRequest("no comments found");
        }
        return Ok(comments);
    }
    [HttpPost]
    [Route("{fighterId}")]
    public async Task<IActionResult> Create ([FromBody] CreateCommentDTO comment,[FromRoute]int fighterId)
    {
        var userName = HttpContext.User.getUserName();
        
        if (!await _fighterRepository.FighterExists(fighterId))
        {
            return BadRequest("fighter does not exist");
        }
        var newComment = await _commentRepository.CreateComment(comment,fighterId,userName);
        if (newComment == null)
        {
            return BadRequest("could not create comment");
        }
        return Ok(newComment);
         
    }
    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> Delete([FromRoute]int id)
    {
        var deletedComment = await _commentRepository.DeleteComment(id);
        if (deletedComment == null)
        {
            return BadRequest("could not delete comment");
        }
        return Ok(deletedComment);
    }


}