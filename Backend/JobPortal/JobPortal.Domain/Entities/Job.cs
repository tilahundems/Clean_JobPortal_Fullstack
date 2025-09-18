namespace JobPortal.Domain;

public class Job
{
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
         public string Description { get; set; } = string.Empty;
         public string Location { get; set; } = string.Empty;
         public DateTime PostedDate { get; set; } = DateTime.UtcNow;
         public DateTime ExpiryDate { get; set; }
         public Guid PostedById { get; set; }
         public User? PostedBy { get; set; }
         public ICollection<JobApplication> Applications { get; set; } = new List<JobApplication>();



}
