using System.Security.Claims;
using JobPortal.Application;
using JobPortal.Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobPortal.API;
// ================= ApplicationsController =================

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ApplicationsController : ControllerBase
{
  private readonly IMediator _mediator;
    private Guid? CurrentUserId =>
        Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

    public ApplicationsController(IMediator mediator) => _mediator = mediator;
      
 
  

     [HttpPost("apply")]
    public async Task<IActionResult> Apply([FromBody] ApplyDto dto, CancellationToken ct)
    {
       

        if (dto == null) return BadRequest("No data provided.");
         if (CurrentUserId is null) return Unauthorized(new { message = "Invalid user. Please log in." });
           
        try
        {
              var cmd = new ApplyCommand(dto.JobId, dto.ApplicantProfileId, CurrentUserId.Value, dto.CoverLetter);
            var created = await _mediator.Send(cmd, ct);
            return CreatedAtAction(nameof(GetByJob), new { jobId = created.JobId }, created);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
    }

      [HttpGet("MyApplications")] 
     public async Task<IActionResult> GetMyApplications(CancellationToken ct)
    {
                if (CurrentUserId is null) return Unauthorized(new { message = "Invalid user. Please log in." });
                    var query = new GetMyApplicationsQuery(CurrentUserId.Value);
                            var apps = await _mediator.Send(query, ct);
                    // var apps = await _applicationService.GetMyApplicationsAsync(CurrentUserId.Value, ct);
                    return Ok(apps);

             
    }



       [HttpDelete("{applicationId:guid}/withdraw")]
    public async Task<IActionResult> WithdrawApplication(Guid applicationId, CancellationToken ct)
    {
                if (CurrentUserId is null) return Unauthorized(new { message = "Invalid user. Please log in." });

            var cmd = new WithdrawApplicationCommand(CurrentUserId.Value, applicationId);
                    var ok = await _mediator.Send(cmd, ct);
        // var ok = await _applicationService.WithdrawApplicationAsync(CurrentUserId.Value, applicationId, ct);
         if (!ok) return NotFound(new { message = "Application not found or you don't have permission." });

        return Ok(new { message = "Application withdrawn successfully." });
    }

       [HttpGet("job/{jobId:guid}")] // After applying, get applications by job
    public async Task<IActionResult> GetByJob(Guid jobId, CancellationToken ct)
    {
          
        var query = new GetApplicationsByJobQuery(jobId);
                var applications = await _mediator.Send(query, ct);
        // var applications = await _applicationService.GetApplicationsByJobIdAsync(jobId, ct);
          return Ok(applications);
    }

  

}
