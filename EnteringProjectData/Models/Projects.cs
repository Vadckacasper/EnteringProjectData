using System.ComponentModel.DataAnnotations.Schema;

namespace EnteringProjectData.Models;

public class Projects
{
    [Key]
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string CustomerCompany { get; set; }
    public string ImplementingCompany { get; set; }
    public DateOnly StartDates { get; set; }
    public DateOnly EndDates { get; set; }
    public int Priority { get; set; }
    public Guid Id_Manager { get; set; }
    [ForeignKey("Id_Manager")]
    public Employee? Manager { get; set; }
    public IEnumerable<Employee>? Employees { get; set; }

}
