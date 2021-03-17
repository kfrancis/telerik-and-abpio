using Microsoft.EntityFrameworkCore;
using Volo.Abp;

namespace TelerikComponents.EntityFrameworkCore
{
    public static class TelerikComponentsDbContextModelCreatingExtensions
    {
        public static void ConfigureTelerikComponents(this ModelBuilder builder)
        {
            Check.NotNull(builder, nameof(builder));

            /* Configure your own tables/entities inside here */

            //builder.Entity<YourEntity>(b =>
            //{
            //    b.ToTable(TelerikComponentsConsts.DbTablePrefix + "YourEntities", TelerikComponentsConsts.DbSchema);
            //    b.ConfigureByConvention(); //auto configure for the base class props
            //    //...
            //});
        }
    }
}