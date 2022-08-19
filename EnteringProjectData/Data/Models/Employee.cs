namespace EnteringProjectData.Models;

public class Employee
{
    [Key]
    public int Id { get; set; }
    [MaxLength(16)]
    public string Name { get; set; } = null!;
    [MaxLength(24)]
    public string Suname { get; set; } = null!;
    [MaxLength(16)]
    public string? Patronymic { get; set; }
    [MaxLength(32)]
    public string Email { get; set; } = null!;  
    public IEnumerable<ProjectsEmployee>? Projects { get; set; }
}
