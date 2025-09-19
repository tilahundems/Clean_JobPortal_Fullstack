using JobPortal.Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace JobPortal.Application;

public class LoginUserHandler : IRequestHandler<LoginUserCommand, bool>
{
    private readonly SignInManager<User> _signInManager;

    public LoginUserHandler(SignInManager<User> signInManager)
    {
        _signInManager = signInManager;
    }

    public async Task<bool> Handle(LoginUserCommand request, CancellationToken cancellationToken)
    {
        var result = await _signInManager.PasswordSignInAsync(
            request.Email, request.Password, request.RememberMe, lockoutOnFailure: false);

        return result.Succeeded;
    }
}