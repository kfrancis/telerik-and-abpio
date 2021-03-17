using TelerikComponents.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace TelerikComponents
{
    [DependsOn(
        typeof(TelerikComponentsEntityFrameworkCoreTestModule)
        )]
    public class TelerikComponentsDomainTestModule : AbpModule
    {

    }
}