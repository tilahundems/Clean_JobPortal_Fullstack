using MediatR;


namespace JobPortal.Application;



public sealed record GetMyApplicationsQuery(Guid UserId) : IRequest<List<ApplicationDto>>;

