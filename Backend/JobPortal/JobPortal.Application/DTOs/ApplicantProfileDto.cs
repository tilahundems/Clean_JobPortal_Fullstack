namespace JobPortal.Application;

public class ApplicantProfileDto
{
     public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string? FullName { get; set; }
    public string? Phone { get; set; }
    public string Skills { get; set; } = string.Empty;
    public string? Education { get; set; }
    public string? ResumeUrl { get; set; }
}