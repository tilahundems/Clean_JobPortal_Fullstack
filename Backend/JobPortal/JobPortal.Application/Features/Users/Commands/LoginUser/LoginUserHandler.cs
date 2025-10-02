using JobPortal.Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace JobPortal.Application;

public class LoginUserHandler : IRequestHandler<LoginUserCommand, UserDto?>
{
    private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;


    public LoginUserHandler(SignInManager<User> signInManager,UserManager<User> userManager)
    {
        _signInManager = signInManager;
    _userManager = userManager;
    }

    public async Task<UserDto?> Handle(LoginUserCommand request, CancellationToken cancellationToken)
    {
        var result = await _signInManager.PasswordSignInAsync(
            request.Email, request.Password, request.RememberMe, lockoutOnFailure: false);

        if (!result.Succeeded) return null;

       
          var user =  await _userManager.FindByEmailAsync(request.Email);
           if (user == null || user.Email== null) return null;

         return new UserDto(
            user.Id,
            user.Email,
          (await _userManager.GetRolesAsync(user)).FirstOrDefault()!

         );
    }
}