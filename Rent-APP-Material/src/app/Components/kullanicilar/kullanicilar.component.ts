import { Component, OnInit, ViewChild } from '@angular/core';
import { Kullanicilar } from 'src/app/Models/Kullanici';
import { ConfirmDialogComponent } from '../../Dialogs/confirm-dialog/confirm-dialog.component';
import { KullanicilarDialogComponent } from '../../Dialogs/kullanicilar-dialog/kullanicilar-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/Services/api.service';
import { MyAlertService } from 'src/app/Services/my-Alert.service';
import { _MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/Models/Sonuc';
import { LoginDialogComponent } from '../../Dialogs/login-dialog/login-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-kullanicilar',
  templateUrl: './kullanicilar.component.html',
  styleUrls: ['./kullanicilar.component.css']
})
export class KullanicilarComponent implements OnInit {

  uAdi !: any;
  kullanicilar !: Kullanicilar[];
  secKullanici !: Kullanicilar;
  events: string[] = [];
  dataSource !: any;
  displayedColumns = ['userId', 'userAdi', 'userMail', 'userIsAdmin', 'islemler']
  opened!: boolean;
  confirmDialogRef !: MatDialogRef<ConfirmDialogComponent>;
  dialogRef !: MatDialogRef<KullanicilarDialogComponent>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: Sort;

  constructor(public apiServis: ApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog,) { }

  ngOnInit(): void {
    this.KullaniciListele();
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
  // Kullanıcı
  KullaniciListele() {
    this.apiServis.KullaniciListe().subscribe((c: any) => {
      this.kullanicilar = c;
      this.dataSource = new _MatTableDataSource(c);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(c);
    })
  }

  KullaniciEkle() {
    var yeniKayit: Kullanicilar = new Kullanicilar();
    this.dialogRef = this.matDialog.open(KullanicilarDialogComponent, {
      width: '500px',
      height: '310px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KullaniciEkle(d).subscribe(() => {
          var s: Sonuc = new Sonuc();
          this.alert.AlertUygula(s);
          this.KullaniciListele();

          if (s.islem) {
            this.KullaniciListele();
          }
        })
      }
    });
  }

  KullaniciDuzenle(kayit: Kullanicilar) {
    this.dialogRef = this.matDialog.open(KullanicilarDialogComponent, {
      width: '500px',
      height: '310px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.userAdi = d.userAdi;
        kayit.userMail = d.userMail;
        kayit.userIsAdmin = d.userIsAdmin;
        kayit.userPassword = d.userPassword;

        this.apiServis.KullaniciDuzenle(kayit).subscribe(() => {
          var s: Sonuc = new Sonuc();
          this.alert.AlertUygula(s);
          this.KullaniciListele();

          if (s.islem) {
            this.KullaniciListele();
          }
        })
      }
    });
  }

  KullaniciSil(kayit: Kullanicilar) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '420px',
      height: '170px',
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.userAdi + " : Adlı Kullanıcı Silinecektir Onaylıyor musunuz ?"

    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KullaniciSil(kayit.userId).subscribe(() => {
          var s: Sonuc = new Sonuc();

          this.alert.AlertUygula(s);
          this.KullaniciListele();
          if (s.islem) {
            this.KullaniciListele();
          }
        })
      }
    })
  }
}
