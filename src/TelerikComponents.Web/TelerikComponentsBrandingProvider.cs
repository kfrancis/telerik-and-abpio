using Volo.Abp.Ui.Branding;
using Volo.Abp.DependencyInjection;

namespace TelerikComponents.Web
{
    [Dependency(ReplaceServices = true)]
    public class TelerikComponentsBrandingProvider : DefaultBrandingProvider
    {
        public override string AppName => "TelerikComponents";
    }
}
