using MediatR;
namespace JobPortal.Application;

public sealed record GetMyProfileQuery(Guid UserId) : IRequest<ApplicantProfileDto?>;
