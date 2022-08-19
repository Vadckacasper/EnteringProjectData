namespace EnteringProjectData.Models;

public class Project
{
    [Key]
    public int Id { get; set; }
    [MaxLength(100)]
    public string Name { get; set; } = null!;
    [MaxLength(50)]
    public string CustomerCompany { get; set; } = null!;
    [MaxLength(50)]
    public string ImplementingCompany { get; set; } = null!;
    public DateTime StartDates { get; set; }
    public DateTime EndDates { get; set; }
    [Required]
    public int Priority { get; set; }
    public int Id_Manager { get; set; }
    public IEnumerable<ProjectsEmployee>? Employees { get; set; }

}
