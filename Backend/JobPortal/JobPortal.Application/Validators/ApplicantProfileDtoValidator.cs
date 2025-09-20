using FluentValidation;
namespace JobPortal.Application;

public class ApplicantProfileDtoValidator : AbstractValidator<ApplicantProfileDto>
{
    public ApplicantProfileDtoValidator()
    {
        RuleFor(x => x.FullName)
            .NotEmpty().WithMessage("Full name is required")
            .MaximumLength(200);

        RuleFor(x => x.Phone)
            .NotEmpty().WithMessage("Phone number is required")
            .Matches(@"^\+?[0-9]{7,15}$")
            .WithMessage("Invalid phone number format");

        RuleFor(x => x.Skills)
            .NotEmpty().WithMessage("Skills are required");

        RuleFor(x => x.Education)
            .NotEmpty().WithMessage("Education is required");
    }
}