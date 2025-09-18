using JobPortal.Application;
using JobPortal.Domain;
using Microsoft.EntityFrameworkCore;

namespace JobPortal.Infrastructure;

public class JobRepository: IJobRepository
{
        private readonly JobPortalDbContext _db;
       public JobRepository(JobPortalDbContext db) => _db = db;

        public async Task<Job?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.Jobs.AsNoTracking().FirstOrDefaultAsync(j => j.Id == id, ct);
    
   
        public async Task<List<Job>> GetAllAsync(CancellationToken ct = default) =>
        await _db.Jobs.AsNoTracking().OrderByDescending(j => j.PostedDate)
           .Where(j => j.ExpiryDate >= DateTime.UtcNow)
        .ToListAsync(ct);
         public async Task<Job> AddAsync(Job job, CancellationToken ct = default)
        {
            _db.Jobs.Add(job);
            await _db.SaveChangesAsync(ct);
            return job;
        }
        public async Task<Job?> UpdateAsync(Job job, CancellationToken ct = default)
        {
            
            var existingJob = await _db.Jobs.FirstOrDefaultAsync(j => j.Id == job.Id, ct);
              if (existingJob == null) return null; 
         
                existingJob.Title = job.Title;
                existingJob.Description = job.Description;
                existingJob.Location = job.Location;
                existingJob.ExpiryDate = job.ExpiryDate;
                existingJob.PostedDate = DateTime.UtcNow;


                await _db.SaveChangesAsync(ct);
                return existingJob;
                
        }
         public async Task DeleteAsync(Job job, CancellationToken ct = default)
        {
            _db.Jobs.Remove(job);
            await _db.SaveChangesAsync(ct);
        }

           public async Task<List<JobApplication>> GetApplicationsAsync(Guid jobId, CancellationToken ct = default) =>
             await _db.Applications
            .Where(a => a.JobId == jobId)
            .Include(a => a.ApplicantProfile)
            .OrderByDescending(a => a.AppliedDate)
            .ToListAsync(ct);

}
