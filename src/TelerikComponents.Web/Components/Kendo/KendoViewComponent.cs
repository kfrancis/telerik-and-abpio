using Microsoft.AspNetCore.Mvc;
using Volo.Abp.AspNetCore.Mvc;

namespace TelerikComponents.Web.Components.Kendo
{
    public class KendoViewComponent : AbpViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View("/Components/Kendo/Default.cshtml");
        }
    }
}
