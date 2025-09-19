using MediatR;
namespace JobPortal.Application;

public class GetMyProfileHandler : IRequestHandler<GetMyProfileQuery, ApplicantProfileDto?>
{
    private readonly IApplicantProfileService _profileService;

    public GetMyProfileHandler(IApplicantProfileService profileService) => _profileService = profileService;

    public async Task<ApplicantProfileDto?> Handle(GetMyProfileQuery request, CancellationToken ct)
    {
        return await _profileService.GetProfileAsync(request.UserId, ct);
    }
}