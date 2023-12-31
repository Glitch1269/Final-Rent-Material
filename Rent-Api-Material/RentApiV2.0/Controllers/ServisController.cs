﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RentApiV2._0.Models;
using RentApiV2._0.View_Model;

namespace RentApiV2._0.Controllers
{
 
    public class ServisController : ApiController
    {
        DBRENTEntities2 db = new DBRENTEntities2();
        SonucModel sonuc = new SonucModel();

        #region Kullanici
        [HttpGet]
        [Route("api/kullanicilistele")]
        public List<KullaniciModel> KullaniciListele()
        {
            List<KullaniciModel> liste = db.Kullanici.Select(x => new KullaniciModel()
            {
                userId = x.userId,
                userAdi = x.userAdi,
                userIsAdmin = x.userIsAdmin,
                userImage = x.userImage,
                userMail = x.userMail,
                userPassword = x.userPassword,
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/kullacibyid/{userId}")]
        public KullaniciModel KullaniciById(string userId)
        {
            KullaniciModel kayit = db.Kullanici.Where(s => s.userId == userId).Select(x => new KullaniciModel()
            {
                userId = x.userId,
                userAdi = x.userAdi,
                userIsAdmin = x.userIsAdmin,
                userImage = x.userImage,
                userMail = x.userMail,
                userPassword = x.userPassword,
            }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/kullaniciekle")]
        public SonucModel KullaniciEkle(KullaniciModel model)
        {
            if (db.Kullanici.Count(s => s.userMail == model.userMail) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "İşlem Başarısız";
                return sonuc;
            }
            Kullanici yeni = new Kullanici();
            yeni.userId = Guid.NewGuid().ToString();
            yeni.userAdi = model.userAdi;
            yeni.userMail = model.userMail;
            yeni.userPassword = model.userPassword;
            yeni.userIsAdmin = model.userIsAdmin;    
            yeni.userImage = model.userImage;
            db.Kullanici.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kullanıcı Eklendi!";
            return sonuc;
        }

        [HttpPut]
        [Route("api/kullaniciduzenle")]
        public SonucModel KullaniciDuzenle(KullaniciModel model)
        {
            Kullanici kayit = db.Kullanici.Where(s => s.userId == model.userId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kullanıcı Bulunamadı !";
                return sonuc;
            }
            kayit.userAdi = model.userAdi;
            kayit.userMail = model.userMail;
            kayit.userPassword = model.userPassword;
            kayit.userIsAdmin = model.userIsAdmin;
            kayit.userImage = model.userImage;
            db.SaveChanges();   
            sonuc.islem = true;
            sonuc.mesaj = "Kullanıcı Düzenlenildi !";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kullanicisil/{userId}")]
        public SonucModel KullaniciSil(string userId)
        {
            Kullanici kayit = db.Kullanici.Where(s => s.userId == userId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kullanıcı Bulunamadı !";
                return sonuc;
            }
            db.Kullanici.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kullanıcı Silindi !";
            return sonuc;


        }
        #endregion   //Kullanıcı Tamamlandı

        #region Araba

        [HttpGet]
        [Route("api/arabalistele")]
        public List<ArabaModel> ArabaListele()
        {
            List<ArabaModel> liste = db.Araba.Select(s => new ArabaModel()
            {
                carId = s.carId,
                carMarka = s.carMarka,
                carModel = s.carModel,
                carYakit = s.carModel,
                carYolcu = s.carYolcu,
                carFiyat = s.carFiyat,
                carKatId = s.carKatId,
                carTelNo = s.carTelNo,
                carResim = s.carResim,
                carRate = s.carRate,
                carDuzen = s.carDuzen,
                carKayit= s.carKayit,
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/arababyid/{carId}")]
        public ArabaModel ArabaById(string carId)
        {
            ArabaModel kayit = db.Araba.Where(x => x.carId == carId).Select(s => new ArabaModel()
            {
                carId = s.carId,
                carMarka = s.carMarka,
                carModel = s.carModel,
                carYakit = s.carYakit,
                carYolcu = s.carYolcu,
                carFiyat = s.carFiyat,
                carKatId = s.carKatId,
                carTelNo = s.carTelNo,
                carResim = s.carResim,
                carRate = s.carRate,
                carDuzen = s.carDuzen,
                carKayit = s.carKayit,
            }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/arabaekle")]
        public SonucModel ArabaEkle(ArabaModel model)
        {
            if (db.Araba.Count(s => s.carId == model.carId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Araba Zaten Kayıtlıdır ! ";
            }  
            Araba yeni = new Araba();
            yeni.carId = Guid.NewGuid().ToString();
            yeni.carMarka = model.carMarka;
            yeni.carModel = model.carModel;
            yeni.carYolcu = model.carYolcu;
            yeni.carFiyat = model.carFiyat;
            yeni.carYakit = model.carYakit;
            yeni.carKatId = model.carKatId;
            yeni.carTelNo = model.carTelNo;
            yeni.carResim = model.carResim;
            yeni.carRate = model.carRate;
            yeni.carDuzen = model.carDuzen;
            yeni.carKayit = model.carKayit;
            db.Araba.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Araba Eklendi !";
            return sonuc;
        }

        [HttpPut]
        [Route("api/arabaduzenle")]
        public SonucModel ArabaDuzenle(ArabaModel model)
        {
            Araba kayit = db.Araba.Where(s => s.carId == model.carId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Araba Bulunamadı !";
                return sonuc;
            }
            kayit.carMarka = model.carMarka;
            kayit.carModel = model.carModel;
            kayit.carYakit = model.carYakit;
            kayit.carYolcu = model.carYolcu;
            kayit.carFiyat = model.carFiyat;
            kayit.carKatId = model.carKatId;
            kayit.carTelNo = model.carTelNo;
            kayit.carResim = model.carResim;
            kayit.carRate = model.carRate;
            kayit.carKayit = model.carKayit;
            kayit.carDuzen = model.carDuzen;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Araba Düzenlenildi !";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/arabasil/{carId}")]
        public SonucModel ArabaSil(string carId)
        {
            Araba kayit = db.Araba.Where(s => s.carId == carId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Araba Bulunamadı";
                return sonuc;
            }

            if (db.Kayit.Count(s => s.kayCarId == carId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Kategori Kaydı Olduğu için Silinemez ! ";
                return sonuc;
            }
            db.Araba.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Araba Silindi !";
            return sonuc;
        }

        #endregion

        #region Kategori

        [HttpGet]
        [Route("api/kategorilistele")]
        public List<KategoriModel> KategoriListe()
        {
            List<KategoriModel> liste = db.Kategori.Select(x => new KategoriModel()
            {
                katId = x.katId,
                katAdi = x.katAdi,
                katKayit = x.katKayit,
                katDuzen = x.katDuzen,
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/kategoribyid/{katId}")]
        public KategoriModel KategoriById(string katId)
        {
            KategoriModel kayit = db.Kategori.Where(s => s.katId == katId).Select(x => new KategoriModel()
            {
                katId = x.katId,
                katAdi = x.katAdi,
                katKayit = x.katKayit,
                katDuzen = x.katDuzen,

            }).FirstOrDefault();

            return kayit;

        }

        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoriEkle(KategoriModel model)
        {
            if (db.Kategori.Count(s => s.katAdi == model.katAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategori Adı Mevcuttur ! ";
                return sonuc;

            }

            Kategori yeni = new Kategori();
            yeni.katId = Guid.NewGuid().ToString();
            yeni.katAdi = model.katAdi;
            db.Kategori.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = " Kategori Eklendi !";
            return sonuc;
        }


        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel KategoriDuzenle(KategoriModel model)
        {
            Kategori kayit = db.Kategori.Where(s => s.katId == model.katId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategori Bulunamadı !";
                return sonuc;

            }

            kayit.katAdi = model.katAdi;
            kayit.katDuzen = model.katDuzen;
            kayit.katKayit = model.katKayit;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Başarıyla Değiştirildi! ";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/kategorisil/{katId}")]
        public SonucModel KategoriSil(string katId)
        {
            Kategori kayit = db.Kategori.Where(s => s.katId == katId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategori Bulunamadı !";
                return sonuc;
            }

            if (db.Kayit.Count(s => s.kayKatId == katId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Kayıtlı Araba Olduğu İçin Silinemez ! ";
                return sonuc;
            }


            db.Kategori.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Silindi ! ";
            return sonuc;
        }
        #endregion

        #region Yakit

        [HttpGet]
        [Route("api/yakitlistele")]
        public List<YakitModel> YakitListe()
        {
            List<YakitModel> liste = db.Yakit.Select(x => new YakitModel()
            {
                yakitId = x.yakitId,
                yakitAdi = x.yakitAdi,               
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/yakitbyid/{yakitId}")]
        public YakitModel YakitById(string yakitId)
        {
            YakitModel kayit = db.Yakit.Where(s => s.yakitId == yakitId).Select(x => new YakitModel()
            {
                yakitId = x.yakitId,
                yakitAdi = x.yakitAdi, 

            }).FirstOrDefault();

            return kayit;

        }

        [HttpPost]
        [Route("api/yakitekle")]
        public SonucModel YakitEkle(YakitModel model)
        {
            if (db.Yakit.Count(s => s.yakitAdi == model.yakitAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yakıt Mevcut ! ";
                return sonuc;

            }

            Yakit yeni = new Yakit();
            yeni.yakitId = Guid.NewGuid().ToString();
            yeni.yakitAdi = model.yakitAdi;
            db.Yakit.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = " Yakıt Eklendi !";
            return sonuc;
        }


        [HttpPut]
        [Route("api/yakitduzenle")]
        public SonucModel YakitDuzenle(YakitModel model)
        {
            Yakit kayit = db.Yakit.Where(s => s.yakitId == model.yakitId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yakıt Bulunamadı !";
                return sonuc;
            }
            kayit.yakitAdi = model.yakitAdi;     
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yakıt ismi Değiştirildi! ";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/yakitsil/{yakitId}")]
        public SonucModel YakitSil(string yakitId)
        {
            Yakit kayit = db.Yakit.Where(s => s.yakitId == yakitId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yakıt Bulunamadı !";
                return sonuc;
            }
            if (db.Kayit.Count(s => s.kayYakitId == yakitId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Kayıtlı Araba Olduğu İçin Silinemez ! ";
                return sonuc;
            }


            db.Yakit.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yakıt Silindi ! ";
            return sonuc;
        }
        #endregion

        #region Kayit
        [HttpGet]
        [Route("api/arabakategoriliste/{carId}")]
        public List<KayitModel> ArabaKategoriListe(string carId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayCarId == carId).Select(x => new KayitModel()
            {
                kayId = x.kayId,
                kayCarId = x.kayCarId,
                kayKatId = x.kayKatId,
            }).ToList();
            foreach (var kayit in liste)
            {
                kayit.arabaBilgi = ArabaById(kayit.kayCarId);
                kayit.kategoriBilgi = KategoriById(kayit.kayKatId);
            }
            return liste;
        }


        [HttpGet]
        [Route("api/kategoriarabaliste/{katId}")]
        public List<KayitModel> KategoriArabaListe(string katId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayKatId == katId).Select(x => new KayitModel()
            {
                kayId = x.kayId,
                kayCarId = x.kayCarId,
                kayKatId = x.kayKatId,
            }).ToList();
            foreach (var kayit in liste)
            {
                kayit.arabaBilgi = ArabaById(kayit.kayCarId);
                kayit.kategoriBilgi = KategoriById(kayit.kayKatId);
            }
            return liste;
        }

        [HttpPost]
        [Route("api/kayitekle")]
        public SonucModel KayitEkle(KayitModel model)
        {
            if (db.Kayit.Count(s => s.kayCarId == model.kayCarId && s.kayKatId == model.kayKatId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Araç Önceden Kategoriye Kaydedilmiş !";

            }

            Kayit yeni = new Kayit();
            yeni.kayId = Guid.NewGuid().ToString();
            yeni.kayCarId = model.kayCarId;
            yeni.kayKatId = model.kayKatId;
            db.Kayit.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Araç kaydı Eklendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kayitsil/{kayId}")]
        public SonucModel KayitSil(string kayId)
        {
            Kayit kayit = db.Kayit.Where(s => s.kayId == kayId).SingleOrDefault();

            if (kayit ==null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı !";
                return sonuc;

            }
            db.Kayit.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kayıt Silindi !";
            return sonuc;
        }
        #endregion
    }
}
