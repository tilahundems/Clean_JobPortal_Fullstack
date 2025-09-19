using MediatR;
namespace JobPortal.Application;

public  sealed record CreateOrUpdateApplicantProfileCommand(
    Guid UserId,
    string FullName,
    string Phone,
    string Skills,
    string Education,
    string ResumeUrl
) : IRequest<ApplicantProfileDto>;