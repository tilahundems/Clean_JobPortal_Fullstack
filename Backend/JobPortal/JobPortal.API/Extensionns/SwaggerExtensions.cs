using Microsoft.OpenApi.Models;

namespace JobPortal.API;

public  static class SwaggerExtensions
{
 public static IServiceCollection AddSwaggerServices(this IServiceCollection services)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c =>
            {
                c.AddSecurityDefinition("cookieAuth", new OpenApiSecurityScheme
                {
                    Name = "Cookie",
                    Type = SecuritySchemeType.ApiKey,
                    In = ParameterLocation.Cookie,
                    Description = "Cookie-based auth (Identity cookie). Login via /api/Users/Auth/login to set cookie."
                });
            });

            return services;
        }
    }
