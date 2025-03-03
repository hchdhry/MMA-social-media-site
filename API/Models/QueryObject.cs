namespace API.Models;
public class QueryObject
{
    public string? NameQuery { get; set; }
    public int PageSize { get; set; } = 20;
    public int PageNumber { get; set; } = 1;

}