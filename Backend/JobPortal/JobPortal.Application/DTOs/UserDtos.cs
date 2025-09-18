namespace JobPortal.Application;

// For returning user info (without password)
public record UserDto(
    Guid Id,
    string FullName,
    string Email,
    string Role
);

// For registration (input)
public record RegisterUserRequest(
   
    string Email,
    string Password
);

// For login (input)
public class LoginDto
{
    public string Email { get; set; } = default!;
    public string Password { get; set; } = default!;
    public bool RememberMe { get; set; } = false;

}