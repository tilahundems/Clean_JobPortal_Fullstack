using JobPortal.Application;
using JobPortal.Domain;
using Microsoft.EntityFrameworkCore;


namespace JobPortal.Infrastructure;

public class ApplicationRepository : IApplicationRepository
{
     private readonly JobPortalDbContext _db;
    public ApplicationRepository(JobPortalDbContext db) => _db = db;

    public async Task<JobApplication> AddAsync(JobApplication application, CancellationToken ct = default)
    {
           
      
        _db.Applications.Add(application);
        await _db.SaveChangesAsync(ct);
        return application;
    }
      public async Task<List<JobApplication>> GetByJobIdAsync(Guid jobId, CancellationToken ct = default) =>
        await _db.Applications.AsNoTracking()
            .Where(a => a.JobId == jobId)
            .OrderByDescending(a => a.AppliedDate)
            .ToListAsync(ct);

        public async Task<List<JobApplication>> GetByApplicantProfileIdAsync(Guid profileId, CancellationToken ct = default) =>
        await _db.Applications
                 .Where(a => a.ApplicantProfileId == profileId)
                 .Include(a => a.Job)
                 .OrderByDescending(a => a.AppliedDate)
                 .ToListAsync(ct);

            public async Task<JobApplication?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.Applications
        .Include(a => a.Job)
        .FirstOrDefaultAsync(a => a.Id == id, ct);

          public async Task DeleteAsync(JobApplication application, CancellationToken ct = default)
            {
                _db.Applications.Remove(application);
                await _db.SaveChangesAsync(ct);
            }      

             public async Task UpdateAsync(JobApplication application, CancellationToken ct = default)
            {
                _db.Applications.Update(application);
                await _db.SaveChangesAsync(ct);
            } 

            public async Task<bool> ExistsAsync(Guid jobId, Guid applicantProfileId, CancellationToken ct = default)
            {
                        return await _db.Applications
                    .AnyAsync(a => a.JobId == jobId && a.ApplicantProfileId == applicantProfileId, ct);
            }          
            public async Task<bool> HasProfileAsync(Guid applicantProfileId, CancellationToken ct = default)
            {
                return await _db.ApplicantProfile
                    .AnyAsync(p => p.Id == applicantProfileId, ct);
            }
}
