import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Yakit } from 'src/app/Models/Yakit';

@Component({
  selector: 'app-yakit-dialog',
  templateUrl: './yakit-dialog.component.html',
  styleUrls: ['./yakit-dialog.component.css']
})
export class YakitDialogComponent implements OnInit {

  dialogBaslik !: string;

  yeniKayit!: Yakit;

  islem !: string;

  frm: FormGroup = new FormGroup({
    yakitAdi: new FormControl(),
    yakitId: new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<YakitDialogComponent>,
    public frmBuild: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;

    if (this.islem == "ekle") {
      this.dialogBaslik = "Yakıt Ekle";
      this.yeniKayit = new Yakit();
    }
    if (this.islem == "duzenle") {

      this.dialogBaslik = "Yakıt Düzenle"
      this.yeniKayit = data.kayit;
    }

  }

  ngOnInit() {
  }

}
