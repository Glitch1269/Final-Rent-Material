import { Component, OnInit, ViewChild } from '@angular/core';
import { Sonuc } from 'src/app/Models/Sonuc';
import { MyAlertService } from 'src/app/Services/my-Alert.service';
import { ConfirmDialogComponent } from 'src/app/Dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Araba } from 'src/app/Models/Araba';
import { ApiService } from 'src/app/Services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ArabaDialogComponent } from 'src/app/Dialogs/Araba-Dialog/Araba-Dialog.component';
import { keyframes } from '@angular/animations';
import { Kategori } from 'src/app/Models/Kategori';
import { DateAdapter } from '@angular/material/core';
import { LoginDialogComponent } from 'src/app/Dialogs/login-dialog/login-dialog.component';

@Component({
  selector: 'app-uye-Homepage',
  templateUrl: './uye-Homepage.component.html',
  styleUrls: ['./uye-Homepage.component.css']
})
export class UyeHomepageComponent implements OnInit {
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
  yetkili(yetki: boolean) {
    if (this.apiServis.oturumKontrol()) {
      this.uAdi = localStorage.getItem("uAdi");
      this.yetkiliMi = localStorage.getItem("UyeYetkileri");

    }
  }

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
  
  // Araba

  ArabaListele() {
    this.apiServis.ArabaListele().subscribe((c: any) => {
      this.arabalar = c;
      this.dataSource = new MatTableDataSource(c);
      this.dataSource.sort = this.sort
      console.log(c);
    })
  }




}
