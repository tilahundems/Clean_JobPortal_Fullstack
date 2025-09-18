namespace JobPortal.Application;

public class ApplicationDto
{
    public Guid Id { get; set; }
    public Guid JobId { get; set; }
    public Guid ApplicantProfileId { get; set; }
    public ApplicantProfileDto? ApplicantProfile { get; set; }
    public DateTime AppliedDate { get; set; }
    public string Status { get; set; } = string.Empty;
    public string CoverLetter { get; set; } = string.Empty;
     public JobDto? Job { get; set; }

    
}

public class ApplyDto
{
      public Guid JobId { get; set; }
    public string CoverLetter { get; set; } = string.Empty;  
    public Guid ApplicantProfileId { get; set; }


}
