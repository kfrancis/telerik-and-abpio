using System.IO;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TelerikComponents.EntityFrameworkCore;
using TelerikComponents.Localization;
using TelerikComponents.MultiTenancy;
using TelerikComponents.Permissions;
using TelerikComponents.Web.Menus;
using Microsoft.OpenApi.Models;
using Volo.Abp;
using Volo.Abp.Account.Admin.Web;
using Volo.Abp.Account.Public.Web;
using Volo.Abp.Account.Public.Web.ExternalProviders;
using Volo.Abp.Account.Web;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.AspNetCore.Mvc.Localization;
using Volo.Abp.AspNetCore.Mvc.UI;
using Volo.Abp.AspNetCore.Mvc.UI.Bootstrap;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.Commercial;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.Lepton;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.Shared;
using Volo.Abp.AuditLogging.Web;
using Volo.Abp.Autofac;
using Volo.Abp.AutoMapper;
using Volo.Abp.Identity.Web;
using Volo.Abp.IdentityServer.Web;
using Volo.Abp.LanguageManagement;
using Volo.Abp.LeptonTheme.Management;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement.Web;
using Volo.Abp.TextTemplateManagement.Web;
using Volo.Abp.UI.Navigation.Urls;
using Volo.Abp.UI;
using Volo.Abp.UI.Navigation;
using Volo.Abp.VirtualFileSystem;
using Volo.Saas.Host;
using System;
using Microsoft.AspNetCore.Authentication.MicrosoftAccount;
using Microsoft.AspNetCore.Authentication.Twitter;
using Volo.Abp.AspNetCore.Mvc.UI.Bundling;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.Lepton.Bundling;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.Shared.Toolbars;
using Volo.Abp.AspNetCore.Serilog;
using Volo.Abp.Swashbuckle;
using TelerikComponents.Web.Bundling.Kendo;
using TelerikComponents.Web.Components.Kendo;
using Volo.Abp.AspNetCore.Mvc.UI.Components.LayoutHook;

namespace TelerikComponents.Web
{
    [DependsOn(
        typeof(TelerikComponentsHttpApiModule),
        typeof(TelerikComponentsApplicationModule),
        typeof(TelerikComponentsEntityFrameworkCoreDbMigrationsModule),
        typeof(AbpAutofacModule),
        typeof(AbpIdentityWebModule),
        typeof(AbpAccountPublicWebIdentityServerModule),
        typeof(AbpAuditLoggingWebModule),
        typeof(LeptonThemeManagementWebModule),
        typeof(SaasHostWebModule),
        typeof(AbpAccountAdminWebModule),
        typeof(AbpIdentityServerWebModule),
        typeof(LanguageManagementWebModule),
        typeof(AbpAspNetCoreMvcUiLeptonThemeModule),
        typeof(TextTemplateManagementWebModule),
        typeof(AbpSwashbuckleModule),
        typeof(AbpAspNetCoreSerilogModule)
        )]
    public class TelerikComponentsWebModule : AbpModule
    {
        public override void PreConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.PreConfigure<AbpMvcDataAnnotationsLocalizationOptions>(options =>
            {
                options.AddAssemblyResource(
                    typeof(TelerikComponentsResource),
                    typeof(TelerikComponentsDomainModule).Assembly,
                    typeof(TelerikComponentsDomainSharedModule).Assembly,
                    typeof(TelerikComponentsApplicationModule).Assembly,
                    typeof(TelerikComponentsApplicationContractsModule).Assembly,
                    typeof(TelerikComponentsWebModule).Assembly
                );
            });
        }

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            var hostingEnvironment = context.Services.GetHostingEnvironment();
            var configuration = context.Services.GetConfiguration();

            ConfigureBundles();
            ConfigureUrls(configuration);
            ConfigurePages(configuration);
            ConfigureAuthentication(context, configuration);
            ConfigureAutoMapper();
            ConfigureVirtualFileSystem(hostingEnvironment);
            ConfigureNavigationServices();
            ConfigureAutoApiControllers();
            ConfigureSwaggerServices(context.Services);
            ConfigureExternalProviders(context);
            ConfigureKendo(context.Services);

            Configure<AbpLayoutHookOptions>(options =>
            {
                options.Add(
                    LayoutHooks.Head.Last, //The hook name
                    typeof(KendoViewComponent) //The component to add
                );
            });
        }

        private void ConfigureKendo(IServiceCollection services)
        {
            services.AddKendo();
        }

        private void ConfigureBundles()
        {
            Configure<AbpBundlingOptions>(options =>
            {
                options.StyleBundles.Configure(
                    LeptonThemeBundles.Styles.Global,
                    bundle =>
                    {
                        bundle.AddFiles("/global-styles.css");
                        bundle.AddContributors(typeof(KendoStyleContributor));
                    }
                );
            });
        }

        private void ConfigurePages(IConfiguration configuration)
        {
            Configure<RazorPagesOptions>(options =>
            {
                options.Conventions.AuthorizePage("/HostDashboard", TelerikComponentsPermissions.Dashboard.Host);
                options.Conventions.AuthorizePage("/TenantDashboard", TelerikComponentsPermissions.Dashboard.Tenant);
            });
        }

        private void ConfigureUrls(IConfiguration configuration)
        {
            Configure<AppUrlOptions>(options =>
            {
                options.Applications["MVC"].RootUrl = configuration["App:SelfUrl"];
            });
        }

        private void ConfigureAuthentication(ServiceConfigurationContext context, IConfiguration configuration)
        {
            context.Services.AddAuthentication()
                .AddJwtBearer(options =>
                {
                    options.Authority = configuration["AuthServer:Authority"];
                    options.RequireHttpsMetadata =  Convert.ToBoolean(configuration["AuthServer:RequireHttpsMetadata"]);;
                    options.Audience  = "TelerikComponents";
                });
        }

        private void ConfigureAutoMapper()
        {
            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddMaps<TelerikComponentsWebModule>();
            });
        }

        private void ConfigureVirtualFileSystem(IWebHostEnvironment hostingEnvironment)
        {
            Configure<AbpVirtualFileSystemOptions>(options =>
            {
                options.FileSets.AddEmbedded<TelerikComponentsWebModule>();

                if (hostingEnvironment.IsDevelopment())
                {
                    options.FileSets.ReplaceEmbeddedByPhysical<TelerikComponentsDomainSharedModule>(Path.Combine(hostingEnvironment.ContentRootPath, string.Format("..{0}TelerikComponents.Domain.Shared", Path.DirectorySeparatorChar)));
                    options.FileSets.ReplaceEmbeddedByPhysical<TelerikComponentsDomainModule>(Path.Combine(hostingEnvironment.ContentRootPath, string.Format("..{0}TelerikComponents.Domain", Path.DirectorySeparatorChar)));
                    options.FileSets.ReplaceEmbeddedByPhysical<TelerikComponentsApplicationContractsModule>(Path.Combine(hostingEnvironment.ContentRootPath, string.Format("..{0}TelerikComponents.Application.Contracts", Path.DirectorySeparatorChar)));
                    options.FileSets.ReplaceEmbeddedByPhysical<TelerikComponentsApplicationModule>(Path.Combine(hostingEnvironment.ContentRootPath, string.Format("..{0}TelerikComponents.Application", Path.DirectorySeparatorChar)));
                    options.FileSets.ReplaceEmbeddedByPhysical<TelerikComponentsHttpApiModule>(Path.Combine(hostingEnvironment.ContentRootPath, string.Format("..{0}..{0}src{0}TelerikComponents.HttpApi", Path.DirectorySeparatorChar)));
                    options.FileSets.ReplaceEmbeddedByPhysical<TelerikComponentsWebModule>(hostingEnvironment.ContentRootPath);
                }
            });
        }

        private void ConfigureNavigationServices()
        {
            Configure<AbpNavigationOptions>(options =>
            {
                options.MenuContributors.Add(new TelerikComponentsMenuContributor());
            });

            Configure<AbpToolbarOptions>(options =>
            {
                options.Contributors.Add(new TelerikComponentsToolbarContributor());
            });
        }

        private void ConfigureAutoApiControllers()
        {
            Configure<AbpAspNetCoreMvcOptions>(options =>
            {
                options.ConventionalControllers.Create(typeof(TelerikComponentsApplicationModule).Assembly);
            });
        }

        private void ConfigureSwaggerServices(IServiceCollection services)
        {
            services.AddSwaggerGen(
                options =>
                {
                    options.SwaggerDoc("v1", new OpenApiInfo { Title = "TelerikComponents API", Version = "v1" });
                    options.DocInclusionPredicate((docName, description) => true);
                    options.CustomSchemaIds(type => type.FullName);
                }
            );
        }

        private void ConfigureExternalProviders(ServiceConfigurationContext context)
        {
            context.Services.AddAuthentication()
                .AddGoogle(GoogleDefaults.AuthenticationScheme, _ => {})
                .WithDynamicOptions<GoogleOptions, GoogleHandler>(
                    GoogleDefaults.AuthenticationScheme,
                    options =>
                    {
                        options.WithProperty(x => x.ClientId);
                        options.WithProperty(x => x.ClientSecret, isSecret: true);
                    }
                )
                .AddMicrosoftAccount(MicrosoftAccountDefaults.AuthenticationScheme, options =>
                {
                    //Personal Microsoft accounts as an example.
                    options.AuthorizationEndpoint = "https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize";
                    options.TokenEndpoint = "https://login.microsoftonline.com/consumers/oauth2/v2.0/token";
                })
                .WithDynamicOptions<MicrosoftAccountOptions, MicrosoftAccountHandler>(
                    MicrosoftAccountDefaults.AuthenticationScheme,
                    options =>
                    {
                        options.WithProperty(x => x.ClientId);
                        options.WithProperty(x => x.ClientSecret, isSecret: true);
                    }
                )
                .AddTwitter(TwitterDefaults.AuthenticationScheme, options => options.RetrieveUserDetails = true)
                .WithDynamicOptions<TwitterOptions, TwitterHandler>(
                    TwitterDefaults.AuthenticationScheme,
                    options =>
                    {
                        options.WithProperty(x => x.ConsumerKey);
                        options.WithProperty(x => x.ConsumerSecret, isSecret: true);
                    }
                );
        }


        public override void OnApplicationInitialization(ApplicationInitializationContext context)
        {
            var app = context.GetApplicationBuilder();
            var env = context.GetEnvironment();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAbpRequestLocalization();

            if (!env.IsDevelopment())
            {
                app.UseErrorPage();
            }

            app.UseVirtualFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseJwtTokenMiddleware();

            if (MultiTenancyConsts.IsEnabled)
            {
                app.UseMultiTenancy();
            }

            app.UseUnitOfWork();
            app.UseIdentityServer();
            app.UseAuthorization();
            app.UseSwagger();
            app.UseAbpSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "TelerikComponents API");
            });
            app.UseAuditing();
            app.UseAbpSerilogEnrichers();
            app.UseConfiguredEndpoints();
        }
    }
}
