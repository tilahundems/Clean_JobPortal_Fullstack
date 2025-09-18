using JobPortal.Domain;

namespace JobPortal.Application;

public  interface IJobRepository
{
    Task<Job?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<List<Job>> GetAllAsync(CancellationToken ct = default);
    Task<Job> AddAsync(Job job, CancellationToken ct = default);
    Task <Job?> UpdateAsync(Job job, CancellationToken ct = default);
    Task DeleteAsync(Job job, CancellationToken ct = default);
   Task<List<JobApplication>> GetApplicationsAsync(Guid jobId, CancellationToken ct = default);

}