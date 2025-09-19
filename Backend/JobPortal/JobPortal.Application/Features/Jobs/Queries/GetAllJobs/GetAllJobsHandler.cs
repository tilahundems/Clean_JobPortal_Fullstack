using JobPortal.Domain;
using MediatR;

namespace JobPortal.Application;

public class GetAllJobsHandler : IRequestHandler<GetAllJobsQuery, List<JobDto>>
{
 private readonly IJobService _jobService;
    public GetAllJobsHandler(IJobService jobService)
    {
        _jobService = jobService;
    }

    public async Task<List<JobDto>> Handle(GetAllJobsQuery request, CancellationToken cancellationToken)
    {
        return await _jobService.GetAllJobsAsync(cancellationToken);
    }
}
