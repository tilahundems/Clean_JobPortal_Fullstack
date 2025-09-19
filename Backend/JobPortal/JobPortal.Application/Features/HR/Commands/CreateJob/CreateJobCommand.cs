using MediatR;
namespace JobPortal.Application;

public sealed record CreateJobCommand(
    Guid PostedById,
    string Title,
    string Description,
    string Location,
    DateTime ExpiryDate
) : IRequest<JobDto>;