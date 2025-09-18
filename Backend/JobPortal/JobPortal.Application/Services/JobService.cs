using JobPortal.Domain;

namespace JobPortal.Application;

public class JobService : IJobService
{
    private readonly IJobRepository _jobRepository;
    public JobService(IJobRepository jobRepository) => _jobRepository = jobRepository;
    
    
     public async Task<JobDto?> GetJobAsync(Guid id, CancellationToken ct = default) 
     {
                  var jobdata = await _jobRepository.GetByIdAsync(id, ct);
                   if (jobdata == null)
                        {
                            return null; 
                        }
                   return ToJobDto(jobdata);

     }



 private static JobDto ToJobDto(Job job)
    {
        return new JobDto
        {
            Description = job.Description,
            ExpiryDate = job.ExpiryDate,        
            Id = job.Id,
            Location = job.Location,
            PostedById = job.PostedById,
            PostedDate = job.PostedDate,
             Title = job.Title
           
    
       } ;

    }


   
    public async  Task<List<JobDto>> GetAllJobsAsync(CancellationToken ct = default) 
    {
                var allJobsData = await _jobRepository.GetAllAsync(ct);

               return allJobsData.Select(job => ToAllJobDto(job)).ToList();
    }

      private static JobDto ToAllJobDto(Job job)
    {
        return new JobDto
        {
            Description = job.Description,
            ExpiryDate = job.ExpiryDate,        
            Id = job.Id,
            Location = job.Location,
            PostedById = job.PostedById,
            PostedDate = job.PostedDate,
             Title = job.Title
           
    
       };

    }

         
    public async Task<JobDto> CreateJobAsync(Job job, CancellationToken ct = default) 
    {
             var jobData =   await _jobRepository.AddAsync(job, ct);
                   
              return ToDto(jobData);
            
    
            

    }
         private static JobDto ToDto(Job job)
    {
        return new JobDto
        {
            Description = job.Description,
            ExpiryDate = job.ExpiryDate,        
            Id = job.Id,
            Location = job.Location,
            PostedById = job.PostedById,
            PostedDate = job.PostedDate,
             Title = job.Title
           
            

        };
    
       }

    
  
  
  
  
    public async Task<JobDto?> UpdateJobAsync(Job job, CancellationToken ct = default) 
    {
          
          var jobData = await _jobRepository.UpdateAsync(job, ct);
    if (jobData == null)
        return null; // no job found, return null safely

    return ToUpdateDto(jobData);

           

    }
      
    
      private static JobDto ToUpdateDto(Job job)
    {
        return new JobDto
        {
            Description = job.Description,
            ExpiryDate = job.ExpiryDate,        
            Id = job.Id,
            Location = job.Location,
            PostedById = job.PostedById,
            PostedDate = job.PostedDate,
            Title = job.Title
          

        };
    
       }
       
    // public Task DeleteJobAsync(Job job, CancellationToken ct = default) =>
    //     _jobRepository.DeleteAsync(job, ct);

         public async Task<bool> DeleteJobAsync(Guid id, Guid userId, CancellationToken ct = default)
    {
        var job = await _jobRepository.GetByIdAsync(id, ct);
        if (job == null) return false;

        // Optional: verify ownership
        await _jobRepository.DeleteAsync(job, ct);
        return true;
    }

  public async Task<List<ApplicationDto>> GetJobApplicationsAsync(Guid jobId, CancellationToken ct = default)
    {
        var apps = await _jobRepository.GetApplicationsAsync(jobId, ct);
        return apps.Select(a => new ApplicationDto
        {
               Id= a.Id,
            AppliedDate = a.AppliedDate,
            Status = a.Status,
            CoverLetter = a.CoverLetter,
             ApplicantProfileId= a.ApplicantProfileId,
              JobId = a.JobId,
               Job= a.Job != null ? new JobDto
               {
                Id = a.Job.Id,
                Title = a.Job.Title,
                Description = a.Job.Description,
                Location = a.Job.Location,
                PostedDate = a.Job.PostedDate,
                ExpiryDate = a.Job.ExpiryDate,
                PostedById = a.Job.PostedById

               } : null,
              

            ApplicantProfile = a.ApplicantProfile != null ? new ApplicantProfileDto
            {
                Id = a.ApplicantProfile.Id,
                FullName = a.ApplicantProfile.FullName,
                Phone = a.ApplicantProfile.Phone,
                ResumeUrl = a.ApplicantProfile.ResumeUrl,
                Skills = a.ApplicantProfile.Skills,
                Education = a.ApplicantProfile.Education,
                UserId = a.ApplicantProfile.UserId,
                


            } : null
             
        }).ToList();
    }




}
