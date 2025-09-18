using JobPortal.Domain;

namespace JobPortal.Application;

public class ApplicantProfileService : IApplicantProfileService
{
    private readonly IApplicantProfileRepository _repository;
    public ApplicantProfileService(IApplicantProfileRepository repository) => _repository = repository;



    public  async Task<ApplicantProfileDto?> GetProfileAsync(Guid userId, CancellationToken ct = default)
    {          

          var profile = await _repository.GetProfileAsync(userId, ct);
        if (profile == null) return null;

        
        return new ApplicantProfileDto
        {
            Id = profile.Id,
            UserId = profile.UserId,
            FullName = profile.FullName,
            Phone = profile.Phone,
            Skills = profile.Skills,
            Education = profile.Education,
             ResumeUrl = profile.ResumeUrl 
            
            
           
        };
    }

   public async Task<ApplicantProfileDto?> CreateOrUpdateProfileAsync(ApplicantProfile profile, CancellationToken ct = default)
    {
        var saved = await _repository.CreateOrUpdateProfileAsync(profile, ct);
           
        return ToDto(saved);
    }

    private static ApplicantProfileDto ToDto(ApplicantProfile profile)
    {
        return new ApplicantProfileDto
        {
            Id = profile.Id,
            UserId = profile.UserId,
            FullName = profile.FullName,
            Phone = profile.Phone,
            Skills = profile.Skills,
            Education = profile.Education,
            ResumeUrl = profile.ResumeUrl 


        };
    }

    public async Task<string?> UploadResumePathAsync(Guid userId, Guid profileId, string resumePath, CancellationToken ct = default)
        {
            // optional: you can add authorization/validation checks here
            return await _repository.SaveResumePathAsync(userId, profileId, resumePath, ct);
        }
     
}
