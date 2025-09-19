using MediatR;
using Microsoft.AspNetCore.Http;

namespace JobPortal.Application;

public sealed record UploadResumeCommand(
    Guid UserId,
    Guid ProfileId,
    IFormFile File
) : IRequest<string>;