using MediatR;
namespace JobPortal.Application;

public record LogoutUserCommand() : IRequest<Unit>;