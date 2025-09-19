using JobPortal.Application;
using JobPortal.Domain;
using Microsoft.EntityFrameworkCore; 
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using MediatR;

namespace JobPortal.API;
// ================= ApplicantProfilesController =================

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Applicant")]
public class ApplicantProfilesController : ControllerBase
{
        private readonly IMediator _mediator;
    
    private Guid? CurrentUserId =>
        Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

      
   public ApplicantProfilesController(IMediator mediator) => _mediator = mediator;


        [HttpPost("createOrUpdate")]
    public async Task<IActionResult> CreateOrUpdate([FromBody] ApplicantProfileDto dto, CancellationToken ct)
    {
        if (dto == null) return BadRequest("Invalid data.");
        if (CurrentUserId is null) return Unauthorized(new { message = "Invalid user. Please log in." });

        var command = new CreateOrUpdateApplicantProfileCommand(
        CurrentUserId.Value,
        dto.FullName ?? string.Empty,
        dto.Phone ?? string.Empty,
        dto.Skills ?? string.Empty,
        dto.Education ?? string.Empty,
        dto.ResumeUrl ?? string.Empty
    );
        // var updated = await _profileService.CreateOrUpdateProfileAsync(profile, ct);
            var result = await _mediator.Send(command, ct);

        return Ok(result);
    }


     [HttpGet("me")]
    public async Task<IActionResult> GetMyProfile(CancellationToken ct)
    {
        if (CurrentUserId is null) return Unauthorized(new { message = "Invalid user. Please log in." });
            var query = new GetMyProfileQuery(CurrentUserId.Value);
             var profile= await _mediator.Send(query, ct);

        // var profile = await _profileService.GetProfileAsync(CurrentUserId.Value, ct);
        if (profile == null) return NotFound(new { message = "You have not set up your profile." });

        return Ok(profile);
    }


 [HttpPost("{profileId:guid}/resume")]
    public async Task<IActionResult> UploadResume(Guid profileId, IFormFile file, CancellationToken ct)
    {
        if (file == null || file.Length == 0) return BadRequest("No file uploaded.");
        if (CurrentUserId is null) return Unauthorized();
            var command = new UploadResumeCommand(CurrentUserId.Value, profileId, file);
    
        try
        {
            var resumeUrl = await _mediator.Send(command, ct);
            return Ok(new { message = "Resume uploaded successfully" });
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        // var saved = await _profileService.UploadResumePathAsync(CurrentUserId.Value, profileId, resumeUrl, ct);

        // if (saved == null) return NotFound("Profile not found or could not save resume path.");
        // return Ok(new { message = "Resume uploaded successfully", resumeUrl });
    }

    
}

