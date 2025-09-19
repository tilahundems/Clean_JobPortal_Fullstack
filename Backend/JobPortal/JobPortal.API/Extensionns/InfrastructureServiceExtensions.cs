using JobPortal.Infrastructure;

namespace JobPortal.API;


public static class InfrastructureServiceExtensions
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddInfrastructure(config);
            return services;
        }
}
