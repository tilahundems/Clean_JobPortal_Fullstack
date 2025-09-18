// using System.Text;
// using JobPortal.API;
// using JobPortal.Application;
// using JobPortal.Domain;
// using JobPortal.Infrastructure;
// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.IdentityModel.Tokens;
// using Microsoft.OpenApi.Models;

// var builder = WebApplication.CreateBuilder(args);

// // builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));
// // var jwtSettings = builder.Configuration.GetSection("Jwt").Get<JwtSettings>() ??
// //                   throw new InvalidOperationException("Jwt settings missing");
// // var keyBytes = Encoding.UTF8.GetBytes(jwtSettings.Key);

// // // builder.Services
// // //     .AddAuthentication(options =>
// // //     {
// // //         options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
// // //         options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
// // //     })
// // //     .AddJwtBearer(options =>
// // //     {
// // //         options.RequireHttpsMetadata = false; // set false for local dev if needed
// // //         options.SaveToken = true;
// // //         options.TokenValidationParameters = new TokenValidationParameters
// // //         {
// // //             ValidateIssuer = true,
// // //             ValidateAudience = true,
// // //             ValidateLifetime = true,
// // //             ValidateIssuerSigningKey = true,
// // //             ValidIssuer = jwtSettings.Issuer,
// // //             ValidAudience = jwtSettings.Audience,
// // //             IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
// // //             ClockSkew = TimeSpan.Zero // optional: reduce default 5m skew
// // //         };
// // //     });
// builder.Services.AddAuthorization();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// // Identity setup here
// builder.Services.AddIdentity<User, IdentityRole<Guid>>(options =>
// {
//     options.Password.RequireDigit = true;
//     options.Password.RequireLowercase = true;
//     options.Password.RequireUppercase = true;
//     options.Password.RequiredLength = 6;
//     options.User.RequireUniqueEmail = true;
// })
// .AddEntityFrameworkStores<JobPortalDbContext>()
// .AddDefaultTokenProviders();
 
// builder.Services.AddControllers();
// builder.Services.AddInfrastructure(builder.Configuration);


// builder.Services.AddCors(opt =>
// {
//     opt.AddPolicy("Frontend", p =>
//         p.WithOrigins("http://localhost:5173", "http://localhost:3000")
//          .AllowAnyHeader()
//          .AllowAnyMethod());
// });

// // builder.Services.AddScoped<ITokenService, TokenService>();

// // builder.Services.AddSwaggerGen(c =>
// // {
// //     c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
// //     {
// //         Name = "Authorization",
// //         Type = SecuritySchemeType.ApiKey,
// //         Scheme = "Bearer",
// //         BearerFormat = "JWT",
// //         In = ParameterLocation.Header,
// //         Description = "Enter 'Bearer {token}'"
// //     });

// //     c.AddSecurityRequirement(new OpenApiSecurityRequirement
// //     {
// //         {
// //             new OpenApiSecurityScheme
// //             {
// //                 Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
// //             },
// //             new string[] {}
// //         }
// //     });
// // });


// var app = builder.Build();
// // Seed roles
// using (var scope = app.Services.CreateScope())
// {
//     var services = scope.ServiceProvider;
//     await RoleSeeder.SeedRolesAsync(services);
// }
// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }



// app.UseSwagger();
// app.UseSwaggerUI();

// app.UseCors("Frontend");
// app.MapControllers();
// app.UseStaticFiles(); 
// app.UseAuthentication(); 
// app.UseAuthorization();

// app.Run();

using System.Text;
using JobPortal.API;
using JobPortal.Application;
using JobPortal.Domain;
using JobPortal.Infrastructure;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Infrastructure, DI, Identity registration (keep your AddInfrastructure)
builder.Services.AddInfrastructure(builder.Configuration);

// Identity
builder.Services.AddIdentity<User, IdentityRole<Guid>>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 6;
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<JobPortalDbContext>()
.AddDefaultTokenProviders();

// Configure application cookie
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.Name = "JobPortalAuth";
    options.Cookie.HttpOnly = true;
    // For local development with different frontend origin, you may need:
    options.Cookie.SameSite = SameSiteMode.Lax;           // change to None for cross-site (see notes)
    options.Cookie.SecurePolicy = CookieSecurePolicy.None; // set to Always in production (requires HTTPS)
    options.LoginPath = "/api/Users/Auth/login";
    options.LogoutPath = "/api/Users/Auth/logout";
    options.SlidingExpiration = true;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(10);
});

// Controllers + Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    // Add cookie info to Swagger UI (note: browser handles cookies; this only documents)
    c.AddSecurityDefinition("cookieAuth", new OpenApiSecurityScheme
    {
        Name = "Cookie",
        Type = SecuritySchemeType.ApiKey,
        In = ParameterLocation.Cookie,
        Description = "Cookie-based auth (Identity cookie). Login via /api/Users/Auth/login to set cookie."
    });
});



builder.Services.AddCors(opt =>
{
    opt.AddPolicy("Frontend", p =>
        p.WithOrigins("http://localhost:5173", "http://localhost:3000")
         .AllowAnyHeader()
         .AllowAnyMethod()
         .AllowCredentials()); 
});

var app = builder.Build();

// Seed roles (if you keep your RoleSeeder)
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await RoleSeeder.SeedRolesAsync(services);
}

// HTTP pipeline: routing -> cors -> auth -> map
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

app.UseCors("Frontend");

app.UseStaticFiles();

app.UseAuthentication(); 
app.UseAuthorization();

app.MapControllers();

app.Run();


