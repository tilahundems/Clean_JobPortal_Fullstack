using JobPortal.Domain;
using MediatR;
namespace JobPortal.Application;

public sealed record GetApplicationsByJobQuery(Guid JobId) : IRequest<IList<JobApplication>>;
