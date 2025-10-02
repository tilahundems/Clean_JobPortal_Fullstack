using MediatR;
namespace JobPortal.Application;

public class GetJobApplicationsHandler : IRequestHandler<GetJobApplicationsQuery, List<ApplicationDto>>
{
    private readonly IJobService _jobService;

    public GetJobApplicationsHandler(IJobService jobService)
    {
        _jobService = jobService;
    }

    public async Task<List<ApplicationDto>> Handle(GetJobApplicationsQuery request, CancellationToken ct)
    {
        var job = await _jobService.GetJobAsync(request.JobId, ct);
        if (job == null) return new List<ApplicationDto>();

        var apps = await _jobService.GetJobApplicationsAsync(request.JobId);
        return apps.Select(a => new ApplicationDto
        {
            Id = a.Id,
            ApplicantProfileId = a.ApplicantProfileId,
            JobId = a.JobId,
            Status = a.Status,
            CoverLetter = a.CoverLetter,
            AppliedDate = a.AppliedDate,
            ApplicantProfile = a.ApplicantProfile == null ? null : new ApplicantProfileDto
            {
                FullName = a.ApplicantProfile.FullName,
                Education = a.ApplicantProfile.Education,
                Phone = a.ApplicantProfile.Phone,
                ResumeUrl = a.ApplicantProfile.ResumeUrl,
                Skills = a.ApplicantProfile.Skills
            },
            Job = a.Job ==null ? null: new JobDto
            {
                Description = a.Job.Description,
                ExpiryDate= a.Job.ExpiryDate,
                Location=a.Job.Location,
                Title=a.Job.Title,
                PostedDate=a.Job.PostedDate
            },
            
            
        }).ToList();
    }
}