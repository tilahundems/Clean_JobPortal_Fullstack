using MediatR;
namespace JobPortal.Application;

public class UploadResumeHandler : IRequestHandler<UploadResumeCommand, string>
{
    private readonly IApplicantProfileService _profileService;

    public UploadResumeHandler(IApplicantProfileService profileService)
    {
        _profileService = profileService;
    }

    public async Task<string> Handle(UploadResumeCommand request, CancellationToken ct)
    {
        var profile = await _profileService.GetProfileAsync(request.UserId, ct);
        if (profile == null || profile.Id != request.ProfileId)
            throw new UnauthorizedAccessException("Profile not found or you don't have permission.");

        var allowed = new[] { ".pdf", ".docx", ".doc" };
        var ext = Path.GetExtension(request.File.FileName).ToLowerInvariant();
        if (!allowed.Contains(ext)) throw new InvalidOperationException("Only PDF/DOC/DOCX files are allowed.");

        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "resumes");
        Directory.CreateDirectory(uploadsFolder);

        var uniqueFileName = $"{Guid.NewGuid()}{ext}";
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using var stream = new FileStream(filePath, FileMode.Create);
        await request.File.CopyToAsync(stream, ct);

        var resumeUrl = $"/resumes/{uniqueFileName}";
        var saved = await _profileService.UploadResumePathAsync(request.UserId, request.ProfileId, resumeUrl, ct);
        if (saved == null) throw new InvalidOperationException("Could not save resume path.");

        return resumeUrl;
    }
}