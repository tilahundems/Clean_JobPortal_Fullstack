using JobPortal.Application;
using JobPortal.Domain;
using Microsoft.EntityFrameworkCore;

namespace JobPortal.Infrastructure;

public class ApplicantProfileRepository :IApplicantProfileRepository
{
     private readonly JobPortalDbContext _db;
    public ApplicantProfileRepository(JobPortalDbContext db) => _db = db;

    public async Task<ApplicantProfile?> GetProfileAsync(Guid userId, CancellationToken ct = default) =>
        await _db.ApplicantProfile.AsNoTracking()
            .FirstOrDefaultAsync(p => p.UserId == userId, ct);

    public async Task<ApplicantProfile> CreateOrUpdateProfileAsync(ApplicantProfile profile, CancellationToken ct = default)
    {
         var existing = await _db.ApplicantProfile
        .FirstOrDefaultAsync(p => p.UserId == profile.UserId, ct);

    if (existing == null)
    {
        // New profile
        _db.ApplicantProfile.Add(profile);
        await _db.SaveChangesAsync(ct);
        return profile;
    }
    else
    {
        existing.FullName = profile.FullName;
        existing.Phone = profile.Phone;
        existing.Skills = profile.Skills;
        existing.Education = profile.Education;
        existing.ResumeUrl = profile.ResumeUrl;

        await _db.SaveChangesAsync(ct);
        return existing;
    }
    
    }
  public async Task<string?> SaveResumePathAsync(Guid userId, Guid profileId, string resumePath, CancellationToken ct = default)
    {
         var profile = await _db.ApplicantProfile
            .FirstOrDefaultAsync(p => p.Id == profileId && p.UserId == userId, ct);

        if (profile == null) return null;

        profile.ResumeUrl = resumePath;
        await _db.SaveChangesAsync(ct);

        return resumePath;
    }


    public async Task<ApplicantProfile?> GetByUserIdAsync(Guid userId, CancellationToken ct = default) =>
        await _db.ApplicantProfile
                 .Include(p => p.Applications)
                 .FirstOrDefaultAsync(p => p.UserId == userId, ct);
                 

}
