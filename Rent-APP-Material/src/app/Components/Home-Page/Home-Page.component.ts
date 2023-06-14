import { Component, OnInit, ViewChild } from '@angular/core';
import { Sonuc } from 'src/app/Models/Sonuc';
import { MyAlertService } from 'src/app/Services/my-Alert.service';
import { ConfirmDialogComponent } from '../../Dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Araba } from 'src/app/Models/Araba';
import { ApiService } from 'src/app/Services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ArabaDialogComponent } from '../../Dialogs/Araba-Dialog/Araba-Dialog.component';
import { keyframes } from '@angular/animations';
import { Kategori } from 'src/app/Models/Kategori';
import { DateAdapter } from '@angular/material/core';
import { LoginDialogComponent } from '../../Dialogs/login-dialog/login-dialog.component';

@Component({
  selector: 'app-Home-Page',
  templateUrl: './Home-Page.component.html',
  styleUrls: ['./Home-Page.component.css']
})
export class HomePageComponent implements OnInit {
  kategoriler!: Kategori[];
  dialogRef !: MatDialogRef<ArabaDialogComponent>
  uAdi !: any;
  yetkiliMi!: any;
  arabalar !: Araba[];
  secAraba !: Araba;
  dataSource: any;
  confirmDialogRef !: MatDialogRef<ConfirmDialogComponent>;
  secArabaRate !: number;
  panelOpenState = false;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.ArabaListele();
    if (this.apiServis.oturumKontrol()) {
      this.uAdi = localStorage.getItem("uAdi");
    }
  }
  // Oturum

  OturumAcDialog() {
    this.matDialog.open(LoginDialogComponent, {
      width: '400px',
      height: '180px',

    });
  }

  OturumKapat() {
    localStorage.clear();
    this.matDialog.open(LoginDialogComponent, {
      width: '400px',
      height: '180px',

    });
  }

  // Kategori

  KategoriListele() {
    this.apiServis.KategoriListele().subscribe((c: any) => {
      this.kategoriler = c;
      this.dataSource = new MatTableDataSource(c);
      this.dataSource.sort = this.sort
      console.log(c);
    })
  }
  // Arabalar

  ArabaListele() {
    this.apiServis.ArabaListele().subscribe((c: any) => {
      this.arabalar = c;
      this.dataSource = new MatTableDataSource(c);
      this.dataSource.sort = this.sort
      console.log(c);
    })
  }

  ArabaEkle() {
    var yeniKayit: Araba = new Araba();
    this.dialogRef = this.matDialog.open(ArabaDialogComponent, {
      width: '500px',
      height: '598px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.ArabaEkle(d).subscribe(() => {
          var s :Sonuc = new Sonuc();
          s.islem = false;
          s.mesaj = "Araba Başarıyla Eklendi!";
          this.alert.AlertUygula(s);
          this.ArabaListele();
          if (s.islem) {
            this.ArabaListele();
          }
        })
      }
    });
  }




}
