namespace EnteringProjectData.Models
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Suname { get; set; }
        public string Patronymic { get; set; }
        public string Email { get; set; }       
        public IEnumerable<Projects>? Projects { get; set; }
    }
}
