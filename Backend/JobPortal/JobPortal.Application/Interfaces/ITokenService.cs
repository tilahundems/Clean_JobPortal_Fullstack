using JobPortal.Domain;

namespace JobPortal.Application;

public interface ITokenService
{
    Task<string> CreateTokenAsync(User user); // returns JWT string

}
