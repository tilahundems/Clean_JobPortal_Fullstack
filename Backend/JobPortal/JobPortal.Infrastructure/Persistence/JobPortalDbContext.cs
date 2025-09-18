using JobPortal.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace JobPortal.Infrastructure;

public class JobPortalDbContext: IdentityDbContext<User, IdentityRole<Guid>, Guid>
{ 
    public JobPortalDbContext(DbContextOptions<JobPortalDbContext> options) : base(options)
    { }

    public DbSet<Job> Jobs => Set<Job>();
    public DbSet<JobApplication> Applications => Set<JobApplication>();
    public DbSet<ApplicantProfile> ApplicantProfile => Set<ApplicantProfile>();

     protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
            base.OnModelCreating(modelBuilder); 
             
         

         modelBuilder.Entity<Job>(b =>
        {
            b.HasKey(x => x.Id);
            b.Property(x => x.Title).HasMaxLength(200);
            b.HasOne(x => x.PostedBy)
             .WithMany(u => u.PostedJobs)
             .HasForeignKey(x => x.PostedById)
             .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<JobApplication>(b =>
        {
            b.HasKey(x => x.Id);
            b.Property(x => x.Status).HasMaxLength(50);
            b.HasOne(x => x.Job)
             .WithMany(j => j.Applications)
             .HasForeignKey(x => x.JobId);
             
            b.HasOne(x => x.ApplicantProfile)
             .WithMany(u => u.Applications)
             .HasForeignKey(x => x.ApplicantProfileId)
             .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<ApplicantProfile>()
            .HasOne(p => p.User)
            .WithOne(u => u.Profile)
            .HasForeignKey<ApplicantProfile>(p => p.UserId)
            .IsRequired();


    }

    
}
