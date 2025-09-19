using MediatR;
namespace JobPortal.Application;

public class GetMyApplicationsHandler : IRequestHandler<GetMyApplicationsQuery, List<ApplicationDto>>
{
    private readonly IApplicationService _applicationService;
    public GetMyApplicationsHandler(IApplicationService applicationService) => _applicationService = applicationService;

    public async Task<List<ApplicationDto>> Handle(GetMyApplicationsQuery request, CancellationToken ct)
    {
        return await _applicationService.GetMyApplicationsAsync(request.UserId, ct);
    }

}
