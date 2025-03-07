using API.Models;
using API.DTO.Fighter;
public static class FighterMapper
{
    public static FighterDTO MapFighterToDTO(this Fighter fighter)
    {
        return new FighterDTO
        {
            Name = fighter.Name,
            Wins = fighter.Wins,
            Losses = fighter.Losses,
            Height = fighter.Height,
            Weight = fighter.Weight,
            Reach = fighter.Reach,
            Stance = fighter.Stance,
            Age = fighter.Age,
            SignificantStrikesLandedPerMinute = fighter.SignificantStrikesLandedPerMinute,
            SignificantStrikeAccuracy = fighter.SignificantStrikeAccuracy,
            StrikesAbsorbedPerMinute = fighter.StrikesAbsorbedPerMinute,
            StrikeDefense = fighter.StrikeDefense,
            TakedownAverage = fighter.TakedownAverage,
            TakedownAccuracy = fighter.TakedownAccuracy,
            TakedownDefense = fighter.TakedownDefense,
            SubmissionAverage = fighter.SubmissionAverage,
            Comments = fighter.Comments.Select(comment => comment.ToCreateCommentDTO()).ToList()
        };
    }

}