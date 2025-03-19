using System;

namespace API.DTO.Gym;

public class GymDTO
{
    public string Name { get; set; } = string.Empty;

    public double Wins { get; set; }
    public double Losses { get; set; }

}
