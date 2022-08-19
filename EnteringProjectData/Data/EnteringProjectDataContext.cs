namespace EnteringProjectData.Data;

public class EnteringProjectDataContext:DbContext
{
    public DbSet<Project> Projects { get; set; } = null!;
    public DbSet<Employee> Employees { get; set; } = null!;
    public DbSet<ProjectsEmployee> ProjectsEmployees { get; set; } = null!;

    public EnteringProjectDataContext(DbContextOptions<EnteringProjectDataContext> options):base(options)
    {
        Database.EnsureCreated();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>().Property(u => u.StartDates).HasColumnType("date");
        modelBuilder.Entity<Project>().Property(u => u.EndDates).HasColumnType("date");
    }
}
