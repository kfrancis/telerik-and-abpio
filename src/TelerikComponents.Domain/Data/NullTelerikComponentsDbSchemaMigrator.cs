using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace TelerikComponents.Data
{
    /* This is used if database provider does't define
     * ITelerikComponentsDbSchemaMigrator implementation.
     */
    public class NullTelerikComponentsDbSchemaMigrator : ITelerikComponentsDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}