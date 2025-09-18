using JobPortal.Application;
using JobPortal.Domain;
using Microsoft.EntityFrameworkCore; 
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace JobPortal.API;
// ================= ApplicantProfilesController =================

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Applicant")]
public class ApplicantProfilesController : ControllerBase
{
        private readonly IApplicantProfileService _profileService;
 private Guid? CurrentUserId =>
        Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

      public ApplicantProfilesController(IApplicantProfileService profileService)
        {
            _profileService = profileService;
        }


        [HttpPost("createOrUpdate")]
    public async Task<IActionResult> CreateOrUpdate([FromBody] ApplicantProfileDto dto, CancellationToken ct)
    {
        if (dto == null) return BadRequest("Invalid data.");
        if (CurrentUserId is null) return Unauthorized(new { message = "Invalid user. Please log in." });

        var profile = new ApplicantProfile
        {
            UserId = CurrentUserId.Value,
            FullName = dto.FullName ?? string.Empty,
            Phone = dto.Phone ?? string.Empty,
            Skills = dto.Skills ?? string.Empty,
            Education = dto.Education ?? string.Empty,
            ResumeUrl = dto.ResumeUrl ?? string.Empty
        };

        var updated = await _profileService.CreateOrUpdateProfileAsync(profile, ct);
        return Ok(updated);
    }


     [HttpGet("me")]
    public async Task<IActionResult> GetMyProfile(CancellationToken ct)
    {
        if (CurrentUserId is null) return Unauthorized(new { message = "Invalid user. Please log in." });

        var profile = await _profileService.GetProfileAsync(CurrentUserId.Value, ct);
        if (profile == null) return NotFound(new { message = "You have not set up your profile." });

        return Ok(profile);
    }


 [HttpPost("{profileId:guid}/resume")]
    public async Task<IActionResult> UploadResume(Guid profileId, IFormFile file, CancellationToken ct)
    {
        if (file == null || file.Length == 0) return BadRequest("No file uploaded.");
        if (CurrentUserId is null) return Unauthorized();

        var profile = await _profileService.GetProfileAsync(CurrentUserId.Value, ct);
        if (profile == null || profile.Id != profileId)
            return Forbid("Profile not found or you don't have permission.");

        var allowed = new[] { ".pdf", ".docx", ".doc" };
        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!allowed.Contains(ext)) return BadRequest("Only PDF/DOC/DOCX files are allowed.");

        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "resumes");
        Directory.CreateDirectory(uploadsFolder);

        var uniqueFileName = $"{Guid.NewGuid()}{ext}";
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream, ct);
        }

        var resumeUrl = $"/resumes/{uniqueFileName}";
        var saved = await _profileService.UploadResumePathAsync(CurrentUserId.Value, profileId, resumeUrl, ct);

        if (saved == null) return NotFound("Profile not found or could not save resume path.");
        return Ok(new { message = "Resume uploaded successfully", resumeUrl });
    }

    
}
