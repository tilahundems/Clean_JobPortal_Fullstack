using JobPortal.Domain;
using MediatR;
namespace JobPortal.Application;

public class CreateOrUpdateApplicantProfileHandler 
    : IRequestHandler<CreateOrUpdateApplicantProfileCommand, ApplicantProfileDto>
{
    private readonly IApplicantProfileService _profileService;

    public CreateOrUpdateApplicantProfileHandler(IApplicantProfileService profileService)
    {
        _profileService = profileService;
    }

    public async Task<ApplicantProfileDto> Handle(
        CreateOrUpdateApplicantProfileCommand request, 
        CancellationToken ct)
    {
        var profile = new ApplicantProfile
        {
            UserId = request.UserId,
            FullName = request.FullName,
            Phone = request.Phone,
            Skills = request.Skills,
            Education = request.Education,
            ResumeUrl = request.ResumeUrl
        };

        return await _profileService.CreateOrUpdateProfileAsync(profile, ct);
    }
}