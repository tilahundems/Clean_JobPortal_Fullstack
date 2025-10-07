namespace JobPortal.API;

public  static class CorsServiceExtensions
{

        public static IServiceCollection AddCorsServices(this IServiceCollection services)
        {
            services.AddCors(opt =>
            {
                opt.AddPolicy("Frontend", p =>
                    p.WithOrigins("http://localhost:5173", "http://localhost:3000","https://abayjobs.netlify.app")
                     .AllowAnyHeader()
                     .AllowAnyMethod()
                     .AllowCredentials());
            });

            return services;
        }
    }
 

