import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArabaDialogComponent } from 'src/app/Dialogs/Araba-Dialog/Araba-Dialog.component';
import { ConfirmDialogComponent } from 'src/app/Dialogs/confirm-dialog/confirm-dialog.component';
import { LoginDialogComponent } from 'src/app/Dialogs/login-dialog/login-dialog.component';
import { Araba } from 'src/app/Models/Araba';
import { Kategori } from 'src/app/Models/Kategori';
import { Sonuc } from 'src/app/Models/Sonuc';
import { ApiService } from 'src/app/Services/api.service';
import { MyAlertService } from 'src/app/Services/my-Alert.service';

@Component({
  selector: 'app-Araba',
  templateUrl: './Araba.component.html',
  styleUrls: ['./Araba.component.css']
})
export class ArabaComponent implements OnInit {
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

  ArabaDuzenle(kayit: Araba) {
    this.dialogRef = this.matDialog.open(ArabaDialogComponent, {
      width: '500px',
      height: '598px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.carMarka = d.carMarka;
        kayit.carModel = d.carModel;
        kayit.carYakit = d.carYakit;
        kayit.carYolcu = d.carYolcu;
        kayit.carKatId = d.carKatId;
        kayit.carFiyat = d.carFiyat;
        kayit.carTelNo = d.carTelNo;
        kayit.carResim = d.carResim;
        kayit.carDuzen = d.carDuzen;
        kayit.carKayit = d.carKayit;
        kayit.carRate = d.carRate;

        this.apiServis.ArabaDuzenle(kayit).subscribe(() => {
          var s :Sonuc = new Sonuc();
          s.islem = false;
          s.mesaj = "Araba Başarıyla Düzenlendi !";
          this.alert.AlertUygula(s);
          this.ArabaListele();

          if (s.islem) {
            this.ArabaListele();
          }
        })
      }
    });
  }


  ArabaSil(kayit: Araba) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px', height: '180px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.carMarka + " Marka , " + kayit.carModel + " Model Araba Silinecektir Onaylıyor musunuz ?"

    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.ArabaSil(kayit.carId).subscribe(() => {
          var s :Sonuc = new Sonuc();
          s.islem = false;
          s.mesaj = "Araba Başarıyla Silindi !";
          this.alert.AlertUygula(s);
          this.ArabaListele();
          
        })
      }
    })
  }
}
