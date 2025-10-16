 FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

 WORKDIR /src

 COPY . .
# COPY JobPortal.API/*.csproj ./JobPortal.API/
# COPY JobPortal.Application/*.csproj ./JobPortal.Application/
# COPY JobPortal.Domain/*.csproj ./JobPortal.Domain/
# COPY JobPortal.Infrastructure/*.csproj ./JobPortal.Infrastructure/

 RUN dotnet restore 

 RUN dotnet publish -c release -o  /app/publish 

 FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS publish

 WORKDIR /app 

COPY --from=build /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:8080

EXPOSE 8080

ENTRYPOINT [ "dotnet" ,"JobPortal.API.dll" ]
