using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TelerikComponents.Data;
using Volo.Abp.DependencyInjection;

namespace TelerikComponents.EntityFrameworkCore
{
    public class EntityFrameworkCoreTelerikComponentsDbSchemaMigrator
        : ITelerikComponentsDbSchemaMigrator, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;

        public EntityFrameworkCoreTelerikComponentsDbSchemaMigrator(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task MigrateAsync()
        {
            /* We intentionally resolving the TelerikComponentsMigrationsDbContext
             * from IServiceProvider (instead of directly injecting it)
             * to properly get the connection string of the current tenant in the
             * current scope.
             */

            await _serviceProvider
                .GetRequiredService<TelerikComponentsMigrationsDbContext>()
                .Database
                .MigrateAsync();
        }
    }
}