using TelerikComponents.Localization;
using Volo.Abp.AspNetCore.Mvc.UI.RazorPages;

namespace TelerikComponents.Web.Pages
{
    public abstract class TelerikComponentsPageModel : AbpPageModel
    {
        protected TelerikComponentsPageModel()
        {
            LocalizationResourceType = typeof(TelerikComponentsResource);
        }
    }
}