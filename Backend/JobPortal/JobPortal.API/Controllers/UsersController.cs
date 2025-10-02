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
                
                 var Res = await _mediator.Send(new LoginUserCommand(dto.Email, dto.Password, dto.RememberMe));
                if (Res == null ) return Unauthorized("Invalid credentials.");
                return Ok(new { message = "Logged in" ,Res});
  
    }
 
    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
       await _mediator.Send(new LogoutUserCommand());
        return Ok(new { message = "Logged out" });
    }



    
}
