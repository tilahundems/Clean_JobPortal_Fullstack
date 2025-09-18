using System.Security.Claims;
using JobPortal.Application;
using JobPortal.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobPortal.API;
// ================= HrJobsController =================


[ApiController]
[Route("api/hr/jobs")]
[Authorize(Roles = "HR")]
public class HrJobsController : ControllerBase
{
     private readonly IJobService  _jobService;
    public HrJobsController(IJobService  jobService) => _jobService = jobService;

   private Guid? CurrentUserId =>
        Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

      [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreatejobDto dto, CancellationToken ct)
    {
        if (dto == null) return BadRequest("No data provided.");

        var job = new Job
        {
            Title = dto.Title,
            Description = dto.Description,
            Location = dto.Location,
            PostedById = CurrentUserId ?? dto.PostedById,
            PostedDate = DateTime.UtcNow,
            ExpiryDate = dto.ExpiryDate
        };

        var created = await _jobService.CreateJobAsync(job, ct);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

      [HttpGet("{id:guid}")] //  After creating new Job 
    public async Task<IActionResult> GetById(Guid id, CancellationToken ct)
    {
        var job = await _jobService.GetJobAsync(id, ct);
        if (job == null) return NotFound(new {message = "Job not found"});
        return Ok(job);
    }

       [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] JobDto dto, CancellationToken ct)
    {
        if (dto == null || id != dto.Id) return BadRequest("ID mismatch or invalid data.");

        var jobEntity = new Job
        {
            Id = dto.Id,
            Title = dto.Title,
            Description = dto.Description,
            Location = dto.Location,
            PostedById = CurrentUserId ?? dto.PostedById,
            PostedDate = dto.PostedDate,
            ExpiryDate = dto.ExpiryDate
        };

        var updated = await _jobService.UpdateJobAsync(jobEntity, ct);
        if (updated == null) return NotFound(new { message = "Job not found" });

        return Ok(new { message = "Job updated successfully" });
    }

 [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteJob(Guid id, CancellationToken ct)
    {
       if (CurrentUserId is null) return Unauthorized(new { message = "Invalid user. Please log in." });

        var success = await _jobService.DeleteJobAsync(id, CurrentUserId.Value);
        if (!success) return NotFound(new { message = "Job not found or not yours." });

        return Ok(new { message = "Job deleted." });
    }


   [HttpGet("{jobId:guid}/applications")] //  But job is null  .... Frontend Check
    public async Task<IActionResult> GetJobApplications(Guid jobId, CancellationToken ct)
    {
         if (CurrentUserId is null) return Unauthorized(new { message = "Invalid user. Please log in." });
       var job = await _jobService.GetJobAsync(jobId, ct);

        if (job == null) return NotFound(new {message = "Job not found"});
       var apps = await _jobService.GetJobApplicationsAsync(jobId);
        return Ok(apps);
    }
}
