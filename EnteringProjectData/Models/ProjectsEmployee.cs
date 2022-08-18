
namespace EnteringProjectData.Models;

public class ProjectsEmployee
{
    public Guid Id { get; set; }
    public Guid Id_Project { get; set; }
    public Guid Id_Employee { get; set; }
    [ForeignKey("Id_Project")]
    public Projects Project { get; set; } = new Projects();
    [ForeignKey("Id_Employee")]
    public Employee Employee { get; set; } = new Employee();
}
