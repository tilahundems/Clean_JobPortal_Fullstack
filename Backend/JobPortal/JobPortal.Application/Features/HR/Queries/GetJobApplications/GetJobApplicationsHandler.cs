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
            AppliedDate = a.AppliedDate
        }).ToList();
    }
}