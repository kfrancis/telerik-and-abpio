using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.AspNetCore.Mvc.UI.Bundling;
using Volo.Abp.AspNetCore.Mvc.UI.Packages.JQuery;
using Volo.Abp.Modularity;

namespace TelerikComponents.Web.Bundling.Kendo
{
    [DependsOn(
        typeof(JQueryScriptContributor)
        )]
    public class KendoScriptContributor : BundleContributor
    {
        public override void ConfigureBundle(BundleConfigurationContext context)
        {
            context.Files.AddIfNotContains("/libs/kendo/dist/kendo-bundle.js");
        }
    }
}
