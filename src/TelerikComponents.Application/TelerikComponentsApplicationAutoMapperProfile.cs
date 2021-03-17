using AutoMapper;
using TelerikComponents.Users;
using Volo.Abp.AutoMapper;

namespace TelerikComponents
{
    public class TelerikComponentsApplicationAutoMapperProfile : Profile
    {
        public TelerikComponentsApplicationAutoMapperProfile()
        {
            /* You can configure your AutoMapper mapping configuration here.
             * Alternatively, you can split your mapping configurations
             * into multiple profile classes for a better organization. */

            CreateMap<AppUser, AppUserDto>().Ignore(x => x.ExtraProperties);
        }
    }
}