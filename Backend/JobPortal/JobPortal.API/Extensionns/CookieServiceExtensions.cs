
namespace JobPortal.API;

public static class CookieServiceExtensions
{
     public static IServiceCollection ConfigureApplicationCookieServices(this IServiceCollection services)
        {
            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.Name = "JobPortalAuth";
                options.Cookie.HttpOnly = true;
                options.Cookie.SameSite = SameSiteMode.None;
                // SameSiteMode.Lax;  // set to None for cross-site
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // set Always in production
                options.LoginPath = "/api/Users/Auth/login";
                options.LogoutPath = "/api/Users/Auth/logout";
                options.SlidingExpiration = true;
                options.ExpireTimeSpan = TimeSpan.FromMinutes(10);
            });

            return services;
        }
    }

