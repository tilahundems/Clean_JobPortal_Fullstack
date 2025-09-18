using JobPortal.Application;
using JobPortal.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobPortal.API;

 [ApiController]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
    private readonly IJobService  _jobService;
   public JobsController(IJobService  jobService)
    {
        _jobService = jobService;
    }
     [HttpGet] 
    public async Task<IActionResult> GetAll(CancellationToken ct)
    {
        var jobs = await _jobService.GetAllJobsAsync(ct);
        return Ok(jobs);
    }

     [HttpGet("{id:guid}")] 
    public async Task<IActionResult> GetById(Guid id, CancellationToken ct)
    {
        var job = await _jobService.GetJobAsync(id, ct);

        if (job == null) return NotFound(new {message = "Job not found"});
        return Ok(job);
    }





}