using JobPortal.Domain;

namespace JobPortal.Application;

public class ApplicationService : IApplicationService
{
     private readonly IApplicationRepository _applicationRepository;
      private readonly IApplicantProfileRepository _profileRepo;
          private readonly IJobRepository _jobRepo;


    public ApplicationService(IApplicationRepository applicationRepository,IApplicantProfileRepository profileRepo, IJobRepository jobRepo)
    {
                _profileRepo = profileRepo;
                 _applicationRepository = applicationRepository;
                    _jobRepo = jobRepo;


    }


    public async Task<ApplicationDto> ApplyAsync(JobApplication application, CancellationToken ct = default) 
    {



        var hasProfile = await _applicationRepository.HasProfileAsync(application.ApplicantProfileId, ct);
        if (!hasProfile)
            throw new InvalidOperationException("You must set up your profile before applying for a job.");

            var alreadyApplied = await _applicationRepository
                    .ExistsAsync(application.JobId, application.ApplicantProfileId, ct);

                if (alreadyApplied)
                    throw new InvalidOperationException("You have already applied for this job.");

               var applicationData= await   _applicationRepository.AddAsync(application, ct);
                   
              return ToDto(applicationData);



    }
       private static ApplicationDto ToDto(JobApplication application)
    {
        return new ApplicationDto
        {
            Id = application.Id,
            JobId = application.JobId,
            ApplicantProfileId = application.ApplicantProfileId,
            AppliedDate = application.AppliedDate,
            Status = application.Status,
            CoverLetter = application.CoverLetter

           
        };
    
       }

 // for Hr 
    public Task<List<JobApplication>> GetApplicationsByJobIdAsync(Guid jobId, CancellationToken ct = default) =>
        _applicationRepository.GetByJobIdAsync(jobId, ct);


// for Applicant
 public async Task<List<ApplicationDto>> GetMyApplicationsAsync(Guid userId, CancellationToken ct = default)
    {
        var profile = await _profileRepo.GetByUserIdAsync(userId, ct);
        if (profile == null) return new List<ApplicationDto>();

        var apps = await _applicationRepository.GetByApplicantProfileIdAsync(profile.Id, ct);

        return apps.Select(a => new ApplicationDto
        {
            Id = a.Id,
            JobId = a.JobId,
            AppliedDate = a.AppliedDate,
            Status = a.Status,
            ApplicantProfileId = a.ApplicantProfileId,
            CoverLetter = a.CoverLetter,
            Job = a.Job == null ? null : new JobDto
            {
                Id = a.Job.Id,
                Title = a.Job.Title,
                Description = a.Job.Description,
                Location = a.Job.Location,
                PostedDate = a.Job.PostedDate,
                ExpiryDate = a.Job.ExpiryDate,
                PostedById= a.Job.PostedById
                

            }
        }).ToList();
    }


      public async Task<bool> WithdrawApplicationAsync(Guid userId, Guid applicationId, CancellationToken ct = default)
    {
        var profile = await _profileRepo.GetByUserIdAsync(userId, ct);
        if (profile == null) return false;

        var app = await _applicationRepository.GetByIdAsync(applicationId, ct);
        if (app == null) return false;

        // Ownership check
        if (app.ApplicantProfile?.UserId != profile.UserId) return false;

       
        await _applicationRepository.DeleteAsync(app, ct);

        return true;
    }


     public async Task<bool> DeleteJobAsync(Guid id, Guid userId, CancellationToken ct = default)
    {
        var job = await _jobRepo.GetByIdAsync(id, ct);
        if (job == null) return false;

        // Optional: verify ownership
        await _jobRepo.DeleteAsync(job, ct);
        return true;
    }


}