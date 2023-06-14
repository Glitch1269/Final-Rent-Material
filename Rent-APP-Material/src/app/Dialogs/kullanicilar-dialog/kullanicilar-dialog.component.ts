import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Kullanicilar } from 'src/app/Models/Kullanici';

@Component({
  selector: 'app-kullanicilar-dialog',
  templateUrl: './kullanicilar-dialog.component.html',
  styleUrls: ['./kullanicilar-dialog.component.css']
})
export class KullanicilarDialogComponent implements OnInit {
  dialogBaslik !: string;

  yeniKayit!: Kullanicilar;

  islem !: string;

  frm: FormGroup = new FormGroup({
    userAdi: new FormControl(),
    userMail: new FormControl(),
    userPassword: new FormControl(),
    userIsAdmin: new FormControl(),
  });
  constructor(public dialogRef: MatDialogRef<KullanicilarDialogComponent>,
    public frmBuild: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
      this.islem = data.islem;
  
      if (this.islem == "ekle") {
        this.dialogBaslik = "Kullanıcı Ekle";
        this.yeniKayit = new Kullanicilar();
      }
      if (this.islem == "duzenle") {
  
        this.dialogBaslik = "Kullanıcı Düzenle"
        this.yeniKayit = data.kayit;
      }
   }

  ngOnInit() {
  }

}
