import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Kategori } from 'src/app/Models/Kategori';

@Component({
  selector: 'app-Kategori-Dialog',
  templateUrl: './Kategori-Dialog.component.html',
  styleUrls: ['./Kategori-Dialog.component.css']
})
export class KategoriDialogComponent implements OnInit {

  dialogBaslik !: string;

  yeniKayit!: Kategori;

  islem !: string;

  frm: FormGroup = new FormGroup({
    katAdi: new FormControl(),
    katId: new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<KategoriDialogComponent>,
    public frmBuild: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;

    if (this.islem == "ekle") {
      this.dialogBaslik = "Kategori Ekle";
      this.yeniKayit = new Kategori();
    }
    if (this.islem == "duzenle") {

      this.dialogBaslik = "Kategori Düzenle"
      this.yeniKayit = data.kayit;
    }

  }

  ngOnInit() {
  }

}
