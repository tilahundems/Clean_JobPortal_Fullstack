using JobPortal.Domain;
using MediatR;

namespace JobPortal.Application;

public class GetApplicationsByJobHandler : IRequestHandler<GetApplicationsByJobQuery,IList<JobApplication>>
{
    private readonly IApplicationService _applicationService;
    public GetApplicationsByJobHandler(IApplicationService applicationService) => _applicationService = applicationService;

    public async Task<IList<JobApplication>> Handle(GetApplicationsByJobQuery request, CancellationToken ct)
    {
        return await _applicationService.GetApplicationsByJobIdAsync(request.JobId, ct);
    }
}