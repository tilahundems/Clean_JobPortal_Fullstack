using System.Security.Claims;
using JobPortal.Application;
using JobPortal.Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobPortal.API;
// ================= HrJobsController =================


[ApiController]
[Route("api/hr/jobs")]
[Authorize(Roles = "HR")]
public class HrJobsController : ControllerBase
{
    private readonly IMediator _mediator;
    public HrJobsController(IMediator  mediator) => _mediator = mediator;
   
   private Guid? CurrentUserId =>
        Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

      [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreatejobDto dto, CancellationToken ct)
    {
        if (dto == null) return BadRequest("No data provided.");
        var command= new CreateJobCommand(CurrentUserId ?? dto.PostedById,dto.Title, dto.Description, dto.Location,
             dto.ExpiryDate);
         var created = _mediator.Send(command, ct);
        
        var createdJob = await _mediator.Send(command, ct);
        return CreatedAtAction(nameof(GetById), new { id = createdJob.Id }, createdJob);
    }

      [HttpGet("{id:guid}")] //  After creating new Job 
    public async Task<IActionResult> GetById(Guid id, CancellationToken ct)
    {
        // var job = await _jobService.GetJobAsync(id, ct);
        var query= new GetJobByIdQuery(id);
        var job = await _mediator.Send(query, ct);
        if (job == null) return NotFound(new {message = "Job not found"});
        return Ok(job);
    }

       [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] JobDto dto, CancellationToken ct)
    {
        if (dto == null || id != dto.Id) return BadRequest("ID mismatch or invalid data.");

       var command = new UpdateJobCommand(dto.Id,CurrentUserId ?? dto.PostedById, dto.Title, dto.Description, dto.Location,
             dto.PostedDate, dto.ExpiryDate);
             var updatedJob = await _mediator.Send(command, ct);

        // var updated = await _jobService.UpdateJobAsync(jobEntity, ct);
        if (updatedJob == false) return NotFound(new { message = "Job not found" });

        return Ok(new { message = "Job updated successfully" });
    }

 [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteJob(Guid id, CancellationToken ct)
    {
       if (CurrentUserId is null) return Unauthorized(new { message = "Invalid user. Please log in." });

      var command = new DeleteJobCommand(id, CurrentUserId.Value);
        var success = await _mediator.Send(command, ct);
        if (!success) return NotFound(new { message = "Job not found or not yours." });

        return Ok(new { message = "Job deleted." });
    }


   [HttpGet("{jobId:guid}/applications")] //  But job is null  .... Frontend Check
    public async Task<IActionResult> GetJobApplications(Guid jobId, CancellationToken ct)
    {
         if (CurrentUserId is null) return Unauthorized(new { message = "Invalid user. Please log in." });
    //    var job = await _jobService.GetJobAsync(jobId, ct);

            var query = new GetJobApplicationsQuery(jobId);
                    var apps = await _mediator.Send(query, ct);
                    if (apps == null) return NotFound(new {message = "Job not found"});
    //    var apps = await _jobService.GetJobApplicationsAsync(jobId);
        return Ok(apps);
    }
}
