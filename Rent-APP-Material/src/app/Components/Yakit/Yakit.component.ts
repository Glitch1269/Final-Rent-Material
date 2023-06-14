import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/Dialogs/confirm-dialog/confirm-dialog.component';
import { LoginDialogComponent } from 'src/app/Dialogs/login-dialog/login-dialog.component';
import { YakitDialogComponent } from 'src/app/Dialogs/yakit-dialog/yakit-dialog.component';
import { Sonuc } from 'src/app/Models/Sonuc';
import { Yakit } from 'src/app/Models/Yakit';
import { ApiService } from 'src/app/Services/api.service';
import { MyAlertService } from 'src/app/Services/my-Alert.service';

@Component({
  selector: 'app-Yakit',
  templateUrl: './Yakit.component.html',
  styleUrls: ['./Yakit.component.css']
})
export class YakitComponent implements OnInit {


  uAdi !: any;

yakitlar !: Yakit[];
secYakit !: Yakit ;

events: string[] = [];
dataSource !: any;
displayedColumns = ['yakitId','yakitAdi','islemler']
opened!: boolean;

confirmDialogRef !: MatDialogRef<ConfirmDialogComponent>;
dialogRef !: MatDialogRef<YakitDialogComponent>

@ViewChild(MatPaginator) paginator !: MatPaginator
@ViewChild(MatSort) sort !: MatSort;

constructor(public apiServis : ApiService,
  public alert : MyAlertService,
  public matDialog : MatDialog,) { }

  ngOnInit(): void {
     this.YakitListele();
     
    if (this.apiServis.oturumKontrol())  {
      this.uAdi = localStorage.getItem("uAdi");
    }
   
  }
OturumAcDialog(){
    this.matDialog.open(LoginDialogComponent,{
       width : '400px',
       height:'180px',
 
       });
   }

   OturumKapat(){
    localStorage.clear();
    this.matDialog.open(LoginDialogComponent,{
      width : '400px',
      height:'180px',

      });
  }
  YakitListele(){
    this.apiServis.YakitListe().subscribe((c : any) => {
      this.yakitlar = c;
      this.dataSource = new MatTableDataSource(c);
      this.dataSource.sort =this.sort;
      this.dataSource.paginator =this.paginator;
      console.log(c); 
    })
  }
  YakitEkle(){
    var yeniKayit : Yakit = new Yakit();
    this.dialogRef = this.matDialog.open(YakitDialogComponent,{
      width : '260px',
      height:'220px',
      data : {
        kayit: yeniKayit,
        islem : 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) 
      {
       this.apiServis.YakitEkle(d).subscribe( () => {
        var s: Sonuc = new Sonuc();
        this.alert.AlertUygula(s);
        this.YakitListele();

        if(s.islem){
          this.YakitListele();
        }
       })
      }
    });
  }

  YakitDuzenle(kayit : Yakit){
    this.dialogRef = this.matDialog.open(YakitDialogComponent,{
      width : '400px',
      height:'220px',
      data : {
        kayit: kayit,
        islem : 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) 
      {
        kayit.yakitAdi = d.yakitAdi;

       this.apiServis.YakitDuzenle(kayit).subscribe( () => {
        var s: Sonuc = new Sonuc();
        this.alert.AlertUygula(s);
        this.YakitListele();

        if(s.islem){
          this.YakitListele();
        }
       })
      }
    });
  }

  YakitSil(kayit : Yakit){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width : '420px',
      height:'170px',
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.yakitAdi + " 'ı Silmek İstiyor musunuz ?"
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.YakitSil(kayit.yakitId).subscribe(() => {
          var s: Sonuc = new Sonuc();
          this.alert.AlertUygula(s);
          this.YakitListele();
          if(s.islem){
            this.YakitListele();
          }
        })
      }
    })
  }

}
