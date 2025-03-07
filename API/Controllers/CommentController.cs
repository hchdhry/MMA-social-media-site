using API.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Sprache;

[ApiController]
[Route("api/[controller]")]
public class CommentController:ControllerBase
{
    private readonly ICommentRepository _commentRepository;
    private readonly IFighterRepository _fighterRepository;
    public CommentController(ICommentRepository commentRepository,IFighterRepository fighterRepository)
    {
        _commentRepository = commentRepository;
        _fighterRepository = fighterRepository;
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
    public async Task<IActionResult> Create ([FromBody] CreateCommentDTO comment,int fighterId)
    {
        if(!await _fighterRepository.FighterExists(fighterId))
        {
            return BadRequest("fighter does not exist");
        }
        var newComment = await _commentRepository.CreateComment(comment,fighterId);
        if (newComment == null)
        {
            return BadRequest("could not create comment");
        }
        return Ok(newComment);
         
    }


}