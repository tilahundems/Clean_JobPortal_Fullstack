using JobPortal.Application;
using Microsoft.AspNetCore.Mvc;
using MediatR;


namespace JobPortal.API;

 [ApiController]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
        private readonly IMediator _mediator;

//    public JobsController(IJobService  jobService)
//     {
//         _jobService = jobService;
//     }
    public JobsController(IMediator mediator)
    {
        _mediator = mediator;
    }
     [HttpGet] 
    public async Task<IActionResult> GetAll(CancellationToken ct)
    {
        // var jobs = await _jobService.GetAllJobsAsync(ct);
        var jobs = await _mediator.Send(new GetAllJobsQuery(), ct);
        return Ok(jobs);
    }

     [HttpGet("{id:guid}")] 
    public async Task<IActionResult> GetById(Guid id, CancellationToken ct)
    {
        // var job = await _jobService.GetJobAsync(id, ct);
          var job = await _mediator.Send(new GetJobByIdQuery(id), ct);

        if (job == null) return NotFound(new {message = "Job not found"});
        return Ok(job);
    }





}