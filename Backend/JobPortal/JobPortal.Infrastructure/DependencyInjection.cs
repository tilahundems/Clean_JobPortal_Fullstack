using JobPortal.Domain;
using JobPortal.Infrastructure;
using JobPortal.Application;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace JobPortal.Infrastructure;

public  static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
    {
        var conn = config.GetConnectionString("JobPortalDb") 
                   ?? throw new InvalidOperationException("Connection string 'JobPortalDb' not found.");
                
                 
        // services.AddDbContext<JobPortalDbContext>(opt =>
        //     opt.UseNpgsql(conn));
            
        services.AddDbContext<JobPortalDbContext>(opt =>
            opt.UseSqlite(conn)
            .EnableSensitiveDataLogging()
           .EnableDetailedErrors()
           .LogTo(Console.WriteLine, LogLevel.Information)
            
            
            );

            //repository registration
        services.AddScoped<IJobRepository, JobRepository>();
        services.AddScoped<IApplicationRepository, ApplicationRepository>();
        services.AddScoped<IApplicantProfileRepository, ApplicantProfileRepository>();
            //sercice registration
        services.AddScoped<IJobService, JobService>();
        services.AddScoped<IApplicationService, ApplicationService>();
        services.AddScoped<IApplicantProfileService, ApplicantProfileService>();

        return services;

    }
}
