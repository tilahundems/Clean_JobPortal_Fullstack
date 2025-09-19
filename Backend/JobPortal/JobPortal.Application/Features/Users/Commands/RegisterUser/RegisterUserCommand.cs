using MediatR;
namespace JobPortal.Application;

public record RegisterUserCommand(string Email, string Password) : IRequest<Guid>;
