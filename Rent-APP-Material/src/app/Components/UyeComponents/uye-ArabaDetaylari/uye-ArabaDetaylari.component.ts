import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ArabaDialogComponent } from 'src/app/Dialogs/Araba-Dialog/Araba-Dialog.component';
import { ConfirmDialogComponent } from 'src/app/Dialogs/confirm-dialog/confirm-dialog.component';
import { LoginDialogComponent } from 'src/app/Dialogs/login-dialog/login-dialog.component';
import { Araba } from 'src/app/Models/Araba';
import { Kategori } from 'src/app/Models/Kategori';
import { Sonuc } from 'src/app/Models/Sonuc';
import { ApiService } from 'src/app/Services/api.service';
import { MyAlertService } from 'src/app/Services/my-Alert.service';

@Component({
  selector: 'app-uye-ArabaDetaylari',
  templateUrl: './uye-ArabaDetaylari.component.html',
  styleUrls: ['./uye-ArabaDetaylari.component.css']
})
export class UyeArabaDetaylariComponent implements OnInit {
  kategoriler !: Kategori[];
  araba !: Araba
  arabalar !: Araba[];
  secAraba !: Araba;
  uAdi !: any;
  dataSource: any;
  events: string[] = [];
  opened!: boolean;
  carId!: string;
  dialogRef !: MatDialogRef<ArabaDialogComponent>
  confirmDialogRef !: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public alert: MyAlertService,
    public matDialog: MatDialog,


  ) { }

  ngOnInit() {
    this.ArabaListele();
    this.kategoriListele();
    if (this.apiServis.oturumKontrol()) {
      this.uAdi = localStorage.getItem("uAdi");
    }
    this.route.params.subscribe((p: any) => {
      if (p) {
        this.carId = p.carId;
        this.ArabasecListele();
        console.log(p);
      }

    })
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
  kategoriListele() {
    this.apiServis.KategoriListele().subscribe((c: any) => {
      this.kategoriler = c;
      this.dataSource = new MatTableDataSource(c);
      console.log(c);
    })
  }
  // Araba
  ArabaListele() {
    this.apiServis.ArabaListele().subscribe((c: any) => {
      this.arabalar = c;
      this.dataSource = new MatTableDataSource(c);
      console.log(c);
    })
  }

  ArabasecListele() {
    this.apiServis.ArabaById(this.carId).subscribe((d: any) => {
      this.araba = d;
    })
  }
 
}
