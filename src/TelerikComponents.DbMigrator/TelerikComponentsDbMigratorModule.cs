using TelerikComponents.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace TelerikComponents.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(TelerikComponentsEntityFrameworkCoreDbMigrationsModule),
        typeof(TelerikComponentsApplicationContractsModule)
    )]
    public class TelerikComponentsDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options =>
            {
                options.IsJobExecutionEnabled = false;
            });
        }
    }
}