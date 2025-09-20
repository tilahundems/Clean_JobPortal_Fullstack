﻿using System.Net;
using System.Text.Json;

namespace JobPortal.API;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;
       public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {try
        {
            await _next(context); 
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception occurred");

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = new
            {
                status = context.Response.StatusCode,
                message = ex.Message,  // ⚠️ In production, hide details
                traceId = context.TraceIdentifier
            };
              await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
}
}
