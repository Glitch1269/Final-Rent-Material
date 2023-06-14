using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace RentApiV2._0.Auth
{
    public class AuthProvider : OAuthAuthorizationServerProvider
    {

        public override async Task ValidateClientAuthentication
            (OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();

        }

        public override async Task GrantResourceOwnerCredentials
            (OAuthGrantResourceOwnerCredentialsContext context)
        {
          //  context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] {"*"});

            var KullaniciServis = new KullaniciServis();
            var user = KullaniciServis.K_OturumAc(context.UserName , context.Password);
            List<string> userYetkileri = new List<string>();

            if(user != null)
            {
                string yetki = "";

                if (user.userIsAdmin == 1)
                {
                    yetki = "Admin";

                }
                else
                {
                    yetki = "Uye";
                }
                userYetkileri.Add(yetki);


                var identity = new ClaimsIdentity(context.Options.AuthenticationType);

                identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                identity.AddClaim(new Claim(ClaimTypes.Role, yetki));
                identity.AddClaim(new Claim(ClaimTypes.PrimarySid, user.userId.ToString()));

                AuthenticationProperties prop = new AuthenticationProperties(new Dictionary<string, string>
                {
                    {"userId", user.userId.ToString() },
                    {"uyeAdi",user.userAdi },
                    {"uyeYetkileri", Newtonsoft.Json.JsonConvert.SerializeObject(userYetkileri) }
                });
                AuthenticationTicket ticket = new AuthenticationTicket(identity, prop);

                context.Validated(ticket);
            }
            else
            {
                context.SetError("Geçersiz istek", "Hatalı kullanıcı bilgisi");
            }
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string,string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }
            return Task.FromResult<object>(null);
        }
    }
}