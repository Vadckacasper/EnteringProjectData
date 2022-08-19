
namespace EnteringProjectData.Models;

public class ProjectsEmployee
{
    public int Id { get; set; }
    public int Id_Project { get; set; }
    public int Id_Employee { get; set; }
    [ForeignKey("Id_Project")]
    public Project Project { get; set; } = null!;
    [ForeignKey("Id_Employee")]
    public Employee Employee { get; set; } = null!;
}
