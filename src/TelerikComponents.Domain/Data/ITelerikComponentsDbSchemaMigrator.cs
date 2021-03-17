using System.Threading.Tasks;

namespace TelerikComponents.Data
{
    public interface ITelerikComponentsDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}