using Microsoft.AspNetCore.Mvc;

namespace EnteringProjectData.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EmployeesController : ControllerBase
{
    private readonly EnteringProjectDataContext _context;

    public EmployeesController(EnteringProjectDataContext context)
    {
        _context = context;
    }

    // GET: api/Employees
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
    {
        if (_context.Employees == null)
        {
            return NotFound();
        }
        return await _context.Employees.ToListAsync();
    }

    // GET: api/Employees/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Employee>> GetEmployee(int id)
    {
        if (_context.Employees == null)
        {
            return NotFound();
        }
        var employee = await _context.Employees.FindAsync(id);

        if (employee == null)
        {
            return NotFound();
        }

        return employee;
    }

    [HttpGet("_project/{id}")]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployeeByIdProjectAsync(int id)
    {
        if (_context.Projects == null)
        {
            return NotFound();
        }

        var employees = await _context.ProjectsEmployees.Include(x => x.Employee).
            Where(x => x.Id_Project == id).
            Select(x => x.Employee).
            ToArrayAsync();

        return employees;
    }

    [HttpGet("_search{FullName}:{id}")]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployeeSearchAsync(string FullName, int id)
    {
        if (_context.Employees == null || FullName is null)
        {
            return NotFound();
        }
        var idEmployee = _context.ProjectsEmployees.Where(x => x.Id_Project == id).Select(x => x.Id_Employee).ToArray();
        var employees = await _context.ProjectsEmployees.
                Include(x => x.Employee).
                Where(x =>
                    !idEmployee.Contains(x.Employee.Id) &&
                    (
                    (x.Employee.Suname + " " + x.Employee.Name + " " + x.Employee.Patronymic).StartsWith(FullName) ||
                    (x.Employee.Name + " " + x.Employee.Suname + " " + x.Employee.Patronymic).StartsWith(FullName)
                    )).
                Select(x => x.Employee).
                Take(5).
                ToArrayAsync();


        return employees;
    }

    // PUT: api/Employees/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutEmployee(int id, Employee employee)
    {
        if (id != employee.Id)
        {
            return BadRequest();
        }

        _context.Entry(employee).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!EmployeeExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/Employees
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Employee>> PostEmployee([FromBody] Employee employee)
    {
        if (_context.Employees == null)
        {
            return Problem("Entity set 'EnteringProjectDataContext.Employees'  is null.");
        }
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
    }

    // DELETE: api/Employees/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(int id)
    {
        if (_context.Employees == null)
        {
            return NotFound();
        }
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null)
        {
            return NotFound();
        }

        _context.Employees.Remove(employee);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool EmployeeExists(int id)
    {
        return (_context.Employees?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}
