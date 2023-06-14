import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Araba } from '../Models/Araba';
import { Kategori } from '../Models/Kategori';
import { Kullanicilar } from '../Models/Kullanici';
import { Yakit } from '../Models/Yakit';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = "http://localhost:61958/api/";
constructor(
public http: HttpClient
) { }

//Kullanici
tokenAl(kadi: string, parola: string)
{
  var data  = "username=" + kadi + "&password=" + parola + "&grant_type=password";
  var reqHeader = new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"});
  return this.http.post(this.apiUrl + "token",data,{headers: reqHeader});
}

oturumKontrol(){
  if (localStorage.getItem("token")) {
    return true;
  } else { 
    return false;
  }
}

YetkiKontrol(yetkiler: any) {
  var sonuc: boolean = false;
  var uyeYetkileri: string[] = JSON.parse(localStorage.getItem("uyeYetkileri") || '');
  if (uyeYetkileri) {
    yetkiler.forEach((element: string): any => {
      if (uyeYetkileri.indexOf(element) > -1) {
        sonuc = true;
        return false;
      }
    })
  } 
  return sonuc;
}


// Get
ArabaListele(){
  return this.http.get(this.apiUrl + "arabalistele");
}
ArabaById(carId:string){
  return this.http.get(this.apiUrl + "arababyid/" + carId);
}

KategoriListele(){
  return this.http.get(this.apiUrl + "kategorilistele");
}
KategoriById(katId:string){
  return this.http.get(this.apiUrl + "kategoribyid/" + katId);
}

KullaniciListe(){
  return this.http.get(this.apiUrl + "kullanicilistele");
}
KullaniciById(userId : string){
  return this.http.get(this.apiUrl + "kullacibyid/" + userId);
}

YakitListe(){
  return this.http.get(this.apiUrl + "yakitlistele");
}
YakitById(yakitId : string){
  return this.http.get(this.apiUrl + "yakitbyid/" + yakitId);
}

KayitArabaKategoriListe(){
  return this.http.get(this.apiUrl + "arabakategoriliste");
}

KayitKategoriArabaListele(){
  return this.http.get(this.apiUrl + "kategoriarabaliste" );
}



// Post
ArabaEkle(car: Araba){
return this.http.post(this.apiUrl + "arabaekle", car);
}

KategoriEkle(kat: Kategori){
return this.http.post(this.apiUrl + "kategoriekle", kat);
}

KullaniciEkle(user : Kullanicilar){
  return this.http.post(this.apiUrl + "kullaniciekle", user);
}

YakitEkle(yakit : Yakit){
  return this.http.post(this.apiUrl + "yakitekle", yakit);
}


// Put
ArabaDuzenle(car : Araba){
return this.http.put(this.apiUrl + "arabaduzenle" , car);
}

KategoriDuzenle(kat : Kategori){
return this.http.put(this.apiUrl + "kategoriduzenle" , kat);
}

KullaniciDuzenle(user : Kullanicilar){
  return this.http.put(this.apiUrl + "kullaniciduzenle" , user);

}

YakitDuzenle(yakit : Yakit){
  return this.http.put(this.apiUrl + "yakitduzenle" , yakit);
}

// Delete
ArabaSil(carId : string){
  return this.http.delete(this.apiUrl +"arabasil/" + carId);
}

KategoriSil(katId : string){
  return this.http.delete(this.apiUrl + "kategorisil/" + katId);
}

KullaniciSil(userId : string){
  return this.http.delete(this.apiUrl + "kullanicisil/" + userId);
}

YakitSil(yakitId : string){
  return this.http.delete(this.apiUrl + "yakitsil/" + yakitId);
}

KayitSil(kayId : string){
  return this.http.delete(this.apiUrl + "kayitsil/" + kayId);
}
}
