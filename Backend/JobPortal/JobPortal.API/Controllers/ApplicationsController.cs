using System.Security.Claims;
using JobPortal.Application;
using JobPortal.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobPortal.API;
// ================= ApplicationsController =================

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ApplicationsController : ControllerBase
{
         private readonly IApplicationService _applicationService;
        private Guid? CurrentUserId =>
        Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

     public ApplicationsController(IApplicationService applicationService)
    {
        _applicationService = applicationService;
    }

  

     [HttpPost("apply")]
    public async Task<IActionResult> Apply([FromBody] ApplyDto dto, CancellationToken ct)
    {
        if (dto == null) return BadRequest("No data provided.");
                if (CurrentUserId is null) return Unauthorized(new { message = "Invalid user. Please log in." });

        try
        {
            var application = new JobApplication
            {
                JobId = dto.JobId,
                ApplicantProfileId = dto.ApplicantProfileId,
                Status = "pending",
                CoverLetter = dto.CoverLetter,
                AppliedDate = DateTime.UtcNow
            };

            var created = await _applicationService.ApplyAsync(application, ct);
            return CreatedAtAction(nameof(GetByJob), new { jobId = created.JobId }, created);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

      [HttpGet("MyApplications")] 
     public async Task<IActionResult> GetMyApplications(CancellationToken ct)
    {
                if (CurrentUserId is null) return Unauthorized(new { message = "Invalid user. Please log in." });
        var apps = await _applicationService.GetMyApplicationsAsync(CurrentUserId.Value, ct);
        return Ok(apps);
    }



       [HttpDelete("{applicationId:guid}/withdraw")]
    public async Task<IActionResult> WithdrawApplication(Guid applicationId, CancellationToken ct)
    {
                if (CurrentUserId is null) return Unauthorized(new { message = "Invalid user. Please log in." });

        var ok = await _applicationService.WithdrawApplicationAsync(CurrentUserId.Value, applicationId, ct);
        if (!ok) return NotFound(new { message = "Application not found or you don't have permission." });

        return Ok(new { message = "Application withdrawn successfully." });
    }

       [HttpGet("job/{jobId:guid}")] // After applying, get applications by job
    public async Task<IActionResult> GetByJob(Guid jobId, CancellationToken ct)
    {
        var applications = await _applicationService.GetApplicationsByJobIdAsync(jobId, ct);
        return Ok(applications);
    }

  

}
