using MediatR;
namespace JobPortal.Application;

public class GetJobByIdHandler : IRequestHandler<GetJobByIdQuery, JobDto?>
{
    private readonly IJobService _jobService;

    public GetJobByIdHandler(IJobService jobService)
    {
        _jobService = jobService;
    }

    public async Task<JobDto?> Handle(GetJobByIdQuery request, CancellationToken ct)
    {
        var job = await _jobService.GetJobAsync(request.Id, ct);
        if (job == null) return null;

        return new JobDto
        {
            Id = job.Id,
            Title = job.Title,
            Description = job.Description,
            Location = job.Location,
            PostedById = job.PostedById,
            PostedDate = job.PostedDate,
            ExpiryDate = job.ExpiryDate
        };
    }
}