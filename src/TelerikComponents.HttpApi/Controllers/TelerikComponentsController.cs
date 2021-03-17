using TelerikComponents.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace TelerikComponents.Controllers
{
    /* Inherit your controllers from this class.
     */
    public abstract class TelerikComponentsController : AbpController
    {
        protected TelerikComponentsController()
        {
            LocalizationResource = typeof(TelerikComponentsResource);
        }
    }
}