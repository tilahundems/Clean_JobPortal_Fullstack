using JobPortal.Domain;
using MediatR;
namespace JobPortal.Application;

public record class GetAllJobsQuery :  IRequest<List<JobDto>>;

