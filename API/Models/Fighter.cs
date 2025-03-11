using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Fighter
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public double Wins { get; set; } 
        public double Losses { get; set; }

        public double? Height { get; set; } // in cm
        public double? Weight { get; set; } // in kg
        public double? Reach { get; set; } // in cm

        public string? Stance { get; set; } = string.Empty;
        public double? Age { get; set; }

        [Column("SLpM")]
        public double? SignificantStrikesLandedPerMinute { get; set; }

        [Column("SigStrAcc")]
        public double? SignificantStrikeAccuracy { get; set; }

        [Column("SApM")]
        public double? StrikesAbsorbedPerMinute { get; set; }

        [Column("StrDef")]
        public double? StrikeDefense { get; set; }

        [Column("TdAvg")]
        public double? TakedownAverage { get; set; }

        [Column("TdAcc")]
        public double? TakedownAccuracy { get; set; }

        [Column("TdDef")]
        public double? TakedownDefense { get; set; }

        [Column("SubAvg")]
        public double? SubmissionAverage { get; set; }

        public List<Comment> Comments { get; set; } = new List<Comment>();
        public List<Gym> gyms { get; set; } = new List<Gym>();
    }
}

