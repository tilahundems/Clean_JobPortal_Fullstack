// using JobPortal.Application;
// using JobPortal.Domain;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.AspNetCore.Mvc;

// namespace JobPortal.API;
// [ApiController]
// [Route("api/[controller]/Auth")]
// public class UsersController: ControllerBase
// {
//     private readonly UserManager<User> _userManager;
//     private readonly ITokenService _tokenService;
//     private readonly  RoleManager<IdentityRole<Guid>>  _roleManager; // optional

//     public UsersController(UserManager<User> userManager, ITokenService tokenService,  RoleManager<IdentityRole<Guid>> roleManager)
//     {
//         _userManager = userManager;
//         _tokenService = tokenService;
//         _roleManager = roleManager;
//     }

     
//     [HttpPost("register")]
//     public async Task<IActionResult> Register([FromBody] RegisterUserRequest req)
//     {
//         var user = new User
//         {
//             UserName = req.Email,
//             Email = req.Email,
//         };

//         var result = await _userManager.CreateAsync(user, req.Password);

//         if (!result.Succeeded)
//             return BadRequest(result.Errors);

//          // Assign default role: Applicant
//     await _userManager.AddToRoleAsync(user, "Applicant");

//         return Ok(new { user.Id, user.Email, Role = "Applicant" });
//     }

//        [HttpPost("login")]
//     public async Task<IActionResult> Login([FromBody] LoginDto dto)
//     {
//         var user = await _userManager.FindByEmailAsync(dto.Email);
//         if (user == null) return Unauthorized("Invalid credentials.");

//         if (!await _userManager.CheckPasswordAsync(user, dto.Password))
//             return Unauthorized("Invalid credentials.");

//         var token = await _tokenService.CreateTokenAsync(user);
//         return Ok(new { token });
//     }

// }


using JobPortal.Application;
using JobPortal.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace JobPortal.API;

[ApiController]
[Route("api/[controller]/Auth")]
public class UsersController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly RoleManager<IdentityRole<Guid>> _roleManager;

    public UsersController(
        UserManager<User> userManager,
        SignInManager<User> signInManager,
        RoleManager<IdentityRole<Guid>> roleManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _roleManager = roleManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserRequest req)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = new User
        {
            UserName = req.Email,
            Email = req.Email,
            // copy other properties if you have them (FullName etc.)
        };

        var result = await _userManager.CreateAsync(user, req.Password);
        if (!result.Succeeded) return BadRequest(result.Errors);

        // Ensure role exists & assign
        if (!await _roleManager.RoleExistsAsync("Applicant"))
            await _roleManager.CreateAsync(new IdentityRole<Guid>("Applicant"));

        await _userManager.AddToRoleAsync(user, "Applicant");

        // Sign in (issue cookie)
        await _signInManager.SignInAsync(user, isPersistent: false);

        return Ok(new { user.Id, user.Email, Role = "Applicant" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        // PasswordSignInAsync uses username; we set username == email during register
        var result = await _signInManager.PasswordSignInAsync(dto.Email, dto.Password, dto.RememberMe, lockoutOnFailure: false);

        if (!result.Succeeded)
            return Unauthorized("Invalid credentials.");

        // Cookie is set automatically by SignInManager
        return Ok(new { message = "Logged in" });
    }

    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok(new { message = "Logged out" });
    }



    
}
