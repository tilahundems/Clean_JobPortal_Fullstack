using MediatR;

namespace JobPortal.Application;


 public sealed record ApplyCommand(
    Guid JobId,
    Guid ApplicantProfileId,
    Guid UserId,
    string CoverLetter
) : IRequest<ApplicationDto>;

