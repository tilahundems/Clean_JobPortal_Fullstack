using MediatR;

namespace JobPortal.Application;

public sealed record WithdrawApplicationCommand(Guid UserId, Guid ApplicationId) : IRequest<bool>;
