using MediatR;
namespace JobPortal.Application;

public record LoginUserCommand(string Email, string Password, bool RememberMe) : IRequest<bool>;

