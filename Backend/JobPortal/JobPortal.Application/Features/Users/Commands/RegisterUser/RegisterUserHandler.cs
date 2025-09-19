using JobPortal.Domain;
using Microsoft.AspNetCore.Identity;
using MediatR;

namespace JobPortal.Application;

public class RegisterUserHandler : IRequestHandler<RegisterUserCommand, Guid>
{
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole<Guid>> _roleManager;

public RegisterUserHandler(UserManager<User> userManager, RoleManager<IdentityRole<Guid>> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<Guid> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var user = new User
        {
            UserName = request.Email,
            Email = request.Email
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
            throw new InvalidOperationException(string.Join(", ", result.Errors.Select(e => e.Description)));

        // Ensure role exists
        if (!await _roleManager.RoleExistsAsync("Applicant"))
            await _roleManager.CreateAsync(new IdentityRole<Guid>("Applicant"));

        await _userManager.AddToRoleAsync(user, "Applicant");
        return user.Id;
    }

}