using JobPortal.Domain;
using MediatR;

namespace JobPortal.Application;


public record GetJobByIdQuery(Guid Id) : IRequest<JobDto?>;
