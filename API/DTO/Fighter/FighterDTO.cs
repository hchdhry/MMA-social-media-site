using API.Models;
namespace API.DTO.Fighter;

public class FighterDTO
{
    public string Name { get; set; } = string.Empty;

    public double Wins { get; set; }
    public double Losses { get; set; }

    public double? Height { get; set; } // in cm
    public double? Weight { get; set; } // in kg
    public double? Reach { get; set; } // in cm

    public string? Stance { get; set; } = string.Empty;
    public double? Age { get; set; }

    public double? SignificantStrikesLandedPerMinute { get; set; }

    public double? SignificantStrikeAccuracy { get; set; }

    public double? StrikesAbsorbedPerMinute { get; set; }

    public double? StrikeDefense { get; set; }

    public double? TakedownAverage { get; set; }

    public double? TakedownAccuracy { get; set; }

    public double? TakedownDefense { get; set; }

    public double? SubmissionAverage { get; set; }
    public List<Comment> comments { get; set; } = new List<Comment>();
}