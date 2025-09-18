namespace JobPortal.Domain;

public class JobApplication
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid JobId { get; set; }
    public Job? Job { get; set; }
    public Guid ApplicantProfileId { get; set; }
    public ApplicantProfile? ApplicantProfile { get; set; }

 
    public DateTime AppliedDate { get; set; } = DateTime.UtcNow;
    public string Status { get; set; } = "Pending";
    public string CoverLetter { get; set; } = string.Empty;
}
