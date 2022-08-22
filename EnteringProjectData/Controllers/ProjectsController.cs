using Microsoft.AspNetCore.Mvc;


namespace EnteringProjectData.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProjectsController : ControllerBase
{
    private readonly EnteringProjectDataContext _context;

    private readonly ILogger<ProjectsController> _logger;

    public ProjectsController(ILogger<ProjectsController> logger, EnteringProjectDataContext context)
    {
        _logger = logger;
        _context = context;
    }

    // GET: api/Projects
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
    {
      if (_context.Projects == null)
      {
          return NotFound();
      }
        return await _context.Projects.ToListAsync();
    }

    [HttpGet("_filterDate{start}:{end}")]
    public async Task<ActionResult<IEnumerable<Project>>> GetFilterDate(DateTime start, DateTime end)
    {
        if (_context.Projects == null)
        {
            return NotFound();
        }
        if(start > end)
        {
            return NotFound();
        }
        return await _context.Projects.Where(x => x.StartDates >= start && x.EndDates <= end).ToArrayAsync();
    }

    [HttpGet("_sortName{sortProject}:{flag}")]
    public async Task<ActionResult<IEnumerable<Project>>> GetSortProject(SortState sortProject, bool flag)
    {
        if (_context.Projects == null)
        {
            return NotFound();
        }

        var projects = sortProject switch
        {
            SortState.NameSort => flag ?
            _context.Projects.OrderBy(x => x.Name) :
            _context.Projects.OrderByDescending(x => x.Name),

            SortState.CustomerCompanySort => flag ?
            _context.Projects.OrderBy(x => x.CustomerCompany) :
            _context.Projects.OrderByDescending(x => x.CustomerCompany),

            SortState.ImplementingCompanySort => flag ?
            _context.Projects.OrderBy(x => x.ImplementingCompany) :
            _context.Projects.OrderByDescending(x => x.ImplementingCompany),

            SortState.StartDatesSort => flag ?
            _context.Projects.OrderBy(x => x.StartDates) :
            _context.Projects.OrderByDescending(x => x.StartDates),

            SortState.EndDatesSort => flag ?
            _context.Projects.OrderBy(x => x.EndDates) :
            _context.Projects.OrderByDescending(x => x.EndDates),

            SortState.PrioritySort => flag ?
            _context.Projects.OrderBy(x => x.Priority) :
            _context.Projects.OrderByDescending(x => x.Priority),

            _ => _context.Projects.OrderBy(x => x.Id),

        };

        return await projects.ToArrayAsync();
    }


    // GET: api/Projects/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Project>> GetProject(int id)
    {
      if (_context.Projects == null)
      {
          return NotFound();
      }
        var project = await _context.Projects.FindAsync(id);

        if (project == null)
        {
            return NotFound();
        }

        return project;
    }

    // PUT: api/Projects/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProject(int id, Project project)
    {
        if (id != project.Id)
        {
            return BadRequest();
        }

        _context.Entry(project).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ProjectExists(id))
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

    // POST: api/Projects
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Project>> PostProject([FromBody] Project project)
    {
      if (_context.Projects == null)
      {
          return Problem("Entity set 'EnteringProjectDataContext.Projects'  is null.");
      }
       _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetProject", new { id = project.Id }, project);
    }

    // DELETE: api/Projects/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        if (_context.Projects == null)
        {
            return NotFound();
        }
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
        {
            return NotFound();
        }

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ProjectExists(int id)
    {
        return (_context.Projects?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}
