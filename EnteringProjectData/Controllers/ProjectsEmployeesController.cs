
using EnteringProjectData.Models;
using Microsoft.AspNetCore.Mvc;


namespace EnteringProjectData.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProjectsEmployeesController : ControllerBase
{
    private readonly EnteringProjectDataContext _context;

    public ProjectsEmployeesController(EnteringProjectDataContext context)
    {
        _context = context;
    }
    // POST: api/ProjectsEmployees
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<ProjectsEmployee>> PostProjectsEmployee([FromBody] ProjectsEmployee projectsEmployee)
    {
        if (_context.ProjectsEmployees == null)
        {
            return Problem("Entity set 'EnteringProjectDataContext.ProjectsEmployees'  is null.");
        }
        _context.ProjectsEmployees.Add(projectsEmployee);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetProject", new { id = projectsEmployee.Id }, projectsEmployee);
    }

    [HttpDelete("{idProject}:{idEnployee}")]
    public async Task<IActionResult> DeleteEmployee(int idProject, int idEnployee)
    {
        if (_context.Employees == null)
        {
            return NotFound();
        }
        var projectEmployee = await _context.ProjectsEmployees.Where(p => p.Id_Project == idProject && p.Id_Employee==idEnployee).FirstOrDefaultAsync();
        if (projectEmployee == null)
        {
            return NotFound();
        }

        _context.ProjectsEmployees.Remove(projectEmployee);
        await _context.SaveChangesAsync();

        return NoContent();
    }


    private bool ProjectsEmployeeExists(int id)
    {
        return (_context.ProjectsEmployees?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}
