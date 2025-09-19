
using JobPortal.Domain;
using MediatR;
namespace JobPortal.Application;

public class ApplyCommandHandler : IRequestHandler<ApplyCommand, ApplicationDto>
{
 private readonly IApplicationService _applicationService;
    private readonly IApplicantProfileService _profileService;

     public ApplyCommandHandler(IApplicationService applicationService, IApplicantProfileService profileService)
    {
        _applicationService = applicationService;
        _profileService = profileService;
    }

     public async Task<ApplicationDto> Handle(ApplyCommand request, CancellationToken ct)
    {
        var profile = await _profileService.GetProfileAsync(request.UserId, ct);
        if (profile == null)
            throw new InvalidOperationException("Create profile first.");

        if (profile.Id != request.ApplicantProfileId)
            throw new UnauthorizedAccessException("You don't have permission to use this profile.");
         
         var application = new JobApplication
        {
            JobId = request.JobId,
            ApplicantProfileId = request.ApplicantProfileId,
            AppliedDate = DateTime.UtcNow,
            Status = "Pending",
            CoverLetter = request.CoverLetter ?? string.Empty
        };

        var created = await _applicationService.ApplyAsync(application, ct);
        return created;

    }

}
