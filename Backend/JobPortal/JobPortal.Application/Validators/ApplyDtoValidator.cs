using FluentValidation;
namespace JobPortal.Application;

public class ApplyDtoValidator : AbstractValidator<ApplyDto>
{
    public ApplyDtoValidator()
    {
        RuleFor(x => x.JobId)
            .NotEmpty().WithMessage("JobId is required");

        RuleFor(x => x.ApplicantProfileId)
            .NotEmpty().WithMessage("ApplicantProfileId is required");

        RuleFor(x => x.CoverLetter)
            .MaximumLength(1000).WithMessage("Cover letter too long (max 1000 chars)");
    }
}