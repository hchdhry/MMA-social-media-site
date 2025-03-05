using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Sprache;

[ApiController]
[Route("api/[controller]")]
public class CommentController:ControllerBase
{
    private readonly ICommentRepository _commentRepository;
    public CommentController(ICommentRepository commentRepository)
    {
        _commentRepository = commentRepository;
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
 


}