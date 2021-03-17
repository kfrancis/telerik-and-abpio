using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace TelerikComponents.EntityFrameworkCore
{
    /* This class is needed for EF Core console commands
     * (like Add-Migration and Update-Database commands) */
    public class TelerikComponentsMigrationsDbContextFactory : IDesignTimeDbContextFactory<TelerikComponentsMigrationsDbContext>
    {
        public TelerikComponentsMigrationsDbContext CreateDbContext(string[] args)
        {
            TelerikComponentsEfCoreEntityExtensionMappings.Configure();

            var configuration = BuildConfiguration();

            var builder = new DbContextOptionsBuilder<TelerikComponentsMigrationsDbContext>()
                .UseSqlServer(configuration.GetConnectionString("Default"));

            return new TelerikComponentsMigrationsDbContext(builder.Options);
        }

        private static IConfigurationRoot BuildConfiguration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../TelerikComponents.DbMigrator/"))
                .AddJsonFile("appsettings.json", optional: false);

            return builder.Build();
        }
    }
}
