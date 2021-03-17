using TelerikComponents.Localization;
using Volo.Abp.Application.Services;

namespace TelerikComponents
{
    /* Inherit your application services from this class.
     */
    public abstract class TelerikComponentsAppService : ApplicationService
    {
        protected TelerikComponentsAppService()
        {
            LocalizationResource = typeof(TelerikComponentsResource);
        }
    }
}
