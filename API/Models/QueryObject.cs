namespace API.Models;
public class QueryObject
{
    public string? NameQuery { get; set; }
    public int PageSize { get; set; } = 20;
    public int PageNumber { get; set; } = 1;
    public bool OrderByWins { get; set; } = false;
    public bool OrderAlphabatically { get; set; } = false;

}