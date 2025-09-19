using JobPortal.Domain;
using JobPortal.Infrastructure;
using Microsoft.AspNetCore.Identity;


namespace JobPortal.API;

public static class IdentityServiceExtensions
{
      public static IServiceCollection AddIdentityServices(this IServiceCollection services)
        {
            services.AddIdentity<User, IdentityRole<Guid>>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 6;
                options.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<JobPortalDbContext>()
            .AddDefaultTokenProviders();

            return services;
        }
    }

