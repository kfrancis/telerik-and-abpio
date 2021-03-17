using System.Threading.Tasks;
using Shouldly;
using Xunit;

namespace TelerikComponents.Pages
{
    public class Index_Tests : TelerikComponentsWebTestBase
    {
        [Fact]
        public async Task Welcome_Page()
        {
            var response = await GetResponseAsStringAsync("/");
            response.ShouldNotBeNull();
        }
    }
}
