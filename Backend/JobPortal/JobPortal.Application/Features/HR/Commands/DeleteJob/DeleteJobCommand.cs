using MediatR;
namespace JobPortal.Application;

public sealed record DeleteJobCommand(Guid JobId, Guid UserId) : IRequest<bool>;
