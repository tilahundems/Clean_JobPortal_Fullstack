namespace JobPortal.Domain;

public class ApplicantProfile
{
    public Guid Id { get; set; } = Guid.NewGuid();             
    public Guid UserId { get; set; } 
    public User? User { get; set; } = null!;
    public string FullName { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Skills { get; set; } = string.Empty;
    public string Education { get; set; } = null!;
    public string ResumeUrl { get; set; } = null!;

    // navigation property
    public List<JobApplication>? Applications { get; set; }

}
