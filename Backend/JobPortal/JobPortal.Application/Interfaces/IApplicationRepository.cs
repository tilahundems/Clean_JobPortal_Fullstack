using JobPortal.Domain;
namespace JobPortal.Application;

public interface IApplicationRepository
{
    Task<JobApplication> AddAsync(JobApplication application, CancellationToken ct = default);
    Task<List<JobApplication>> GetByJobIdAsync(Guid jobId, CancellationToken ct = default);
    Task<List<JobApplication>> GetByApplicantProfileIdAsync(Guid profileId, CancellationToken ct = default);
    Task<JobApplication?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task UpdateAsync(JobApplication application, CancellationToken ct = default); 
    Task DeleteAsync(JobApplication application, CancellationToken ct = default);
    Task<bool> ExistsAsync(Guid jobId, Guid applicantProfileId, CancellationToken ct = default);
    Task<bool> HasProfileAsync(Guid applicantProfileId, CancellationToken ct = default);







}

 