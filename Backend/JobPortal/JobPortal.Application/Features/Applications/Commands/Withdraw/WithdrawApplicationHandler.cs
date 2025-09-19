using MediatR;

namespace JobPortal.Application;

public class WithdrawApplicationHandler : IRequestHandler<WithdrawApplicationCommand, bool>
{
    private readonly IApplicationService _applicationService;

    public WithdrawApplicationHandler(IApplicationService applicationService) => _applicationService = applicationService;

    public async Task<bool> Handle(WithdrawApplicationCommand request, CancellationToken ct)
    {
        return await _applicationService.WithdrawApplicationAsync(request.UserId, request.ApplicationId, ct);
    }
}