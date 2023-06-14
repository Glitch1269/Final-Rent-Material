using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RentApiV2._0.Models;
using RentApiV2._0.View_Model;

namespace RentApiV2._0.Auth
{

    public class KullaniciServis
    {
        DBRENTEntities2 db = new DBRENTEntities2();

        public KullaniciModel K_OturumAc(string userAdi, string userPassword)
        {
            KullaniciModel user = db.Kullanici.Where(s => s.userAdi == userAdi && s.userPassword == userPassword).Select(x => new KullaniciModel()

            {
                userId = x.userId,
                userAdi = x.userAdi,
                userIsAdmin = x.userIsAdmin,
                userImage = x.userImage,
                userMail = x.userMail,
                userPassword = x.userPassword,

            }).SingleOrDefault();

            return user;
        }
    }
}