using MediatR;
namespace JobPortal.Application;

public sealed record UpdateJobCommand(
    Guid Id,
    Guid PostedById,
    string Title,
    string Description,
    string Location,
    DateTime PostedDate,
    DateTime ExpiryDate
) : IRequest<bool>; // returns true if updated