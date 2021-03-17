using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace TelerikComponents
{
    public class TelerikComponentsWebTestStartup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplication<TelerikComponentsWebTestModule>();
        }

        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            app.InitializeApplication();
        }
    }
}
