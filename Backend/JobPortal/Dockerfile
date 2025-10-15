 FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

 WORKDIR /src

 COPY . .

 RUN dotnet restore JobPortal.API/JobPortal.API.csproj

 RUN dotnet publish -c release -o  /app/publish 

 FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS publish

 WORKDIR /app 

COPY --from=build /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:8080

EXPOSE 8080

ENTRYPOINT [ "dotnet" ,"JobPortal.API.dll" ]
