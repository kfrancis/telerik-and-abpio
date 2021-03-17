using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.AspNetCore.Mvc.UI.Bundling;

namespace TelerikComponents.Web.Bundling.Kendo
{
    public class KendoStyleContributor : BundleContributor
    {
        public override void ConfigureBundle(BundleConfigurationContext context)
        {
            context.Files.AddIfNotContains("/libs/kendo/css/web/kendo.common-bootstrap.min.css");
            context.Files.AddIfNotContains("/libs/kendo/css/web/kendo.bootstrap-v4.min.css");
        }
    }
}
