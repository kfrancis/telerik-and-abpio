using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;

namespace TelerikComponents.EntityFrameworkCore
{
    [DependsOn(
        typeof(TelerikComponentsEntityFrameworkCoreModule)
    )]
    public class TelerikComponentsEntityFrameworkCoreDbMigrationsModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAbpDbContext<TelerikComponentsMigrationsDbContext>();
        }
    }
}