using Volo.Abp.Settings;

namespace TelerikComponents.Settings
{
    public class TelerikComponentsSettingDefinitionProvider : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            //Define your own settings here. Example:
            //context.Add(new SettingDefinition(TelerikComponentsSettings.MySetting1));
        }
    }
}
