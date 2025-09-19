using JobPortal.Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace JobPortal.Application;


public class LogoutUserHandler : IRequestHandler<LogoutUserCommand , Unit>
{
    private readonly SignInManager<User> _signInManager;

    public LogoutUserHandler(SignInManager<User> signInManager)
    {
        _signInManager = signInManager;
    }

    public async Task<Unit> Handle(LogoutUserCommand request, CancellationToken cancellationToken)
    {
        await _signInManager.SignOutAsync();
        return Unit.Value;
    }
}