using JobPortal.Domain;

namespace JobPortal.Application;

public interface IJobService
{
    Task<JobDto?> GetJobAsync(Guid id, CancellationToken ct = default);
    Task<JobDto?> UpdateJobAsync(Job job, CancellationToken ct = default);
    Task<JobDto> CreateJobAsync(Job job, CancellationToken ct = default);
    Task<List<JobDto>> GetAllJobsAsync(CancellationToken ct = default);
    Task<bool> DeleteJobAsync(Guid id, Guid userId, CancellationToken ct = default);
    Task<List<ApplicationDto>> GetJobApplicationsAsync(Guid jobId, CancellationToken ct = default);




}


public interface IApplicationService
{
    Task<ApplicationDto> ApplyAsync(JobApplication application, CancellationToken ct = default);
    Task<List<JobApplication>> GetApplicationsByJobIdAsync(Guid jobId, CancellationToken ct = default);
    Task<List<ApplicationDto>> GetMyApplicationsAsync(Guid userId, CancellationToken ct = default);
    Task<bool> WithdrawApplicationAsync(Guid userId, Guid applicationId, CancellationToken ct = default);
    Task<bool> DeleteJobAsync(Guid id, Guid userId, CancellationToken ct = default);






}

public interface IApplicantProfileService
{
    Task<ApplicantProfileDto?> GetProfileAsync(Guid userId, CancellationToken ct = default);
    Task<ApplicantProfileDto> CreateOrUpdateProfileAsync(ApplicantProfile profile, CancellationToken ct = default);
   Task<string?> UploadResumePathAsync(Guid userId, Guid profileId, string resumePath, CancellationToken ct = default);

}