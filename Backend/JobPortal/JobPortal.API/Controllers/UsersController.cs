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
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace JobPortal.API;

[ApiController]
[Route("api/[controller]/Auth")]
public class UsersController : ControllerBase
{
     private readonly IMediator _mediator;
    public UsersController(IMediator mediator) =>  _mediator=mediator;
    
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserRequest req)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
      var id = await _mediator.Send(new RegisterUserCommand(req.Email, req.Password));
        return Ok(new { id, req.Email, Role = "Applicant" });   

       
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
                
                 var success = await _mediator.Send(new LoginUserCommand(dto.Email, dto.Password, dto.RememberMe));
        if (!success) return Unauthorized("Invalid credentials.");
        return Ok(new { message = "Logged in" });
  
    }
 
    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
       await _mediator.Send(new LogoutUserCommand());
        return Ok(new { message = "Logged out" });
    }



    
}
