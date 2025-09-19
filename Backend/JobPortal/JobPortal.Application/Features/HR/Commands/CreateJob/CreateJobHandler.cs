using MediatR;
using JobPortal.Domain;

namespace JobPortal.Application;
public class CreateJobHandler : IRequestHandler<CreateJobCommand, JobDto>
{
    private readonly IJobService _jobService;
 public CreateJobHandler(IJobService jobService)
    {

        _jobService = jobService;
    }

    public async Task<JobDto> Handle(CreateJobCommand request, CancellationToken ct)
    {
        var job = new Job
        {
            Title = request.Title,
            Description = request.Description,
            Location = request.Location,
            PostedById = request.PostedById,
            PostedDate = DateTime.UtcNow,
            ExpiryDate = request.ExpiryDate
        };

        var created = await _jobService.CreateJobAsync(job, ct);
        return new JobDto
        {
            Id = created.Id,
            Title = created.Title,
            Description = created.Description,
            Location = created.Location,
            PostedById = created.PostedById,
            PostedDate = created.PostedDate,
            ExpiryDate = created.ExpiryDate
        };
    }
}