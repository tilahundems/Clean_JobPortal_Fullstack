using MediatR;
namespace JobPortal.Application;

public sealed record GetJobApplicationsQuery(Guid JobId) : IRequest<List<ApplicationDto>>;
