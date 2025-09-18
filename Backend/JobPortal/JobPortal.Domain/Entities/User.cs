using Microsoft.AspNetCore.Identity;

namespace JobPortal.Domain;

public class User:IdentityUser<Guid>
{
    public ICollection<Job> PostedJobs { get; set; } = new List<Job>();
    public ICollection<JobApplication> Applications { get; set; } = new List<JobApplication>();
    public ApplicantProfile? Profile { get; set; }

}
