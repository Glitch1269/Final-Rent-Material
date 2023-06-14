import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kategori } from 'src/app/Models/Kategori';
import { ApiService } from 'src/app/Services/api.service';
import { MyAlertService } from 'src/app/Services/my-Alert.service';
import { ConfirmDialogComponent } from '../../Dialogs/confirm-dialog/confirm-dialog.component';
import { KategoriDialogComponent } from '../../Dialogs/Kategori-Dialog/Kategori-Dialog.component';
import { Sonuc } from 'src/app/Models/Sonuc';
import { LoginDialogComponent } from '../../Dialogs/login-dialog/login-dialog.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-Kategori',
  templateUrl: './Kategori.component.html',
  styleUrls: ['./Kategori.component.css']
})
export class KategoriComponent implements OnInit {

  uAdi !: any;
  kategoriler !: Kategori[];
  secKategori !: Kategori;
  events: string[] = [];
  dataSource !: any;
  displayedColumns = ['katId', 'katAdi', 'islemler']
  opened!: boolean;

  confirmDialogRef !: MatDialogRef<ConfirmDialogComponent>;
  dialogRef !: MatDialogRef<KategoriDialogComponent>

  @ViewChild(MatPaginator) paginator !: MatPaginator
  @ViewChild(MatSort) sort !: MatSort;
  constructor(public apiServis: ApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog,) { }

  ngOnInit(): void {
    this.KategoriListele();
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
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(c);
    })
  }

  KategoriEkle() {
    var yeniKayit: Kategori = new Kategori();
    this.dialogRef = this.matDialog.open(KategoriDialogComponent, {
      width: '260px',
      height: '220px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KategoriEkle(d).subscribe(() => {
          var s: Sonuc = new Sonuc();
          this.alert.AlertUygula(s);
          this.KategoriListele();

          if (s.islem) {
            this.KategoriListele();
          }
        })
      }
    });
  }

  KategoriDuzenle(kayit: Kategori) {
    this.dialogRef = this.matDialog.open(KategoriDialogComponent, {
      width: '400px',
      height: '220px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.katAdi = d.katAdi;

        this.apiServis.KategoriDuzenle(kayit).subscribe(() => {
          var s: Sonuc = new Sonuc();
          this.alert.AlertUygula(s);
          this.KategoriListele();

          if (s.islem) {
            this.KategoriListele();
          }
        })
      }
    });
  }

  KategoriSil(kayit: Kategori) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '420px',
      height: '170px',
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.katAdi + " : Silinecektir Onaylıyor musunuz ?"

    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KategoriSil(kayit.katId).subscribe(() => {
          var s: Sonuc = new Sonuc();

          this.alert.AlertUygula(s);
          this.KategoriListele();
          if (s.islem) {
            this.KategoriListele();
          }
        })
      }
    })
  }
}
