import { outputAst } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KullanicilarDialogComponent } from 'src/app/Dialogs/kullanicilar-dialog/kullanicilar-dialog.component';
import { Kullanicilar } from 'src/app/Models/Kullanici';
import { Sonuc } from 'src/app/Models/Sonuc';
import { ApiService } from 'src/app/Services/api.service';
import { MyAlertService } from 'src/app/Services/my-Alert.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  dialogRef !: MatDialogRef<KullanicilarDialogComponent>
  constructor(
    public apiServis: ApiService,public alert : MyAlertService,
    public matDialog : MatDialog

  ) { }

  ngOnInit() {
  }
  OturumAc(kadi: string,parola: string){
this.apiServis.tokenAl(kadi,parola).subscribe((d : any) => {
localStorage.setItem("token",d.access_token);
localStorage.setItem("uId",d.userId);
localStorage.setItem("uAdi",d.uyeAdi);
localStorage.setItem("uyeYetkileri",d.uyeYetkileri);

  console.log(d);

  location.href= "";
}, err => {
  var s :Sonuc = new Sonuc();
  s.islem = false;
  s.mesaj = "Kullanıcı Adı veya Parola Yanlış !";
  this.alert.AlertUygula(s);
});
  }
  
      KullaniciEkle(){
        var yeniKayit : Kullanicilar = new Kullanicilar();
        this.dialogRef = this.matDialog.open(KullanicilarDialogComponent,{
          width : '500px',
          height:'310px',
          data : {
            kayit: yeniKayit,
            islem : 'ekle'
          }
        });
        this.dialogRef.afterClosed().subscribe(d => {
          if (d){ 
           this.apiServis.KullaniciEkle(d).subscribe( () => {
            var s: Sonuc = new Sonuc();
            this.alert.AlertUygula(s);
           })
          }
        });
      }

}
