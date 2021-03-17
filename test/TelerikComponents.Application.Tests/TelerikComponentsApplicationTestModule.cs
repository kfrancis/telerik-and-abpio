using Volo.Abp.Modularity;

namespace TelerikComponents
{
    [DependsOn(
        typeof(TelerikComponentsApplicationModule),
        typeof(TelerikComponentsDomainTestModule)
        )]
    public class TelerikComponentsApplicationTestModule : AbpModule
    {

    }
}