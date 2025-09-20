using JobPortal.API;
using JobPortal.Application;
using FluentValidation;



var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddIdentityServices();
builder.Services.ConfigureApplicationCookieServices();
builder.Services.AddCorsServices();
builder.Services.AddSwaggerServices();
builder.Services.AddValidatorsFromAssemblyContaining<CreateJobDtoValidator>();

builder.Services.AddControllers();

builder.Services.AddApplication();

var app = builder.Build();

// Seed roles
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await RoleSeeder.SeedRolesAsync(services);
}

// HTTP Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseMiddleware<ExceptionHandlingMiddleware>();



app.Run();
