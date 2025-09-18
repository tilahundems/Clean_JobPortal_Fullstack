
using JobPortal.Domain;

namespace JobPortal.Application;

public interface IApplicantProfileRepository 
{
        Task<ApplicantProfile?> GetProfileAsync(Guid userId, CancellationToken ct = default);
       Task<ApplicantProfile> CreateOrUpdateProfileAsync(ApplicantProfile profile, CancellationToken ct = default);
       Task<string?> SaveResumePathAsync(Guid userId, Guid profileId, string resumePath, CancellationToken ct = default);
     Task<ApplicantProfile?> GetByUserIdAsync(Guid userId, CancellationToken ct = default);


}
