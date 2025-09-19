using JobPortal.Domain;
using MediatR;
namespace JobPortal.Application;
public class UpdateJobHandler : IRequestHandler<UpdateJobCommand, bool>
{
    private readonly IJobService _jobService;

    public UpdateJobHandler(IJobService jobService)
    {
        _jobService = jobService;
    }

    public async Task<bool> Handle(UpdateJobCommand request, CancellationToken ct)
    {
        var jobEntity = new Job
        {
            Id = request.Id,
            Title = request.Title,
            Description = request.Description,
            Location = request.Location,
            PostedById = request.PostedById,
            PostedDate = request.PostedDate,
            ExpiryDate = request.ExpiryDate
        };

        var updated = await _jobService.UpdateJobAsync(jobEntity, ct);
        return updated != null;
    }
}