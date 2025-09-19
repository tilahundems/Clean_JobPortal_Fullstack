using MediatR;
namespace JobPortal.Application;

public class DeleteJobHandler : IRequestHandler<DeleteJobCommand, bool>
{
    private readonly IJobService _jobService;

    public DeleteJobHandler(IJobService jobService)
    {
        _jobService = jobService;
    }

    public async Task<bool> Handle(DeleteJobCommand request, CancellationToken ct)
    {
        var success = await _jobService.DeleteJobAsync(request.JobId, request.UserId);
        return success;
    }
}