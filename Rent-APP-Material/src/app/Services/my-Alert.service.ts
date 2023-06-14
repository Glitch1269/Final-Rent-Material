import { publishFacade } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {MatDialog,MatDialogRef} from '@angular/material/dialog';
import { Sonuc } from '../Models/Sonuc';
import { AlertDialogComponent } from '../Dialogs/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MyAlertService {

  alertDialogRef !: MatDialogRef<AlertDialogComponent>;

constructor(
  public matDialog : MatDialog
) { }

AlertUygula(s: Sonuc)
{
  var baslik  = "";
  if(s.islem){
    baslik = "Hata";
  } else {
    baslik = "İşlem Tamam";
  }
  this.alertDialogRef = this.matDialog.open(AlertDialogComponent, {
    width : '300px',
    height: '130px'
  });
  this.alertDialogRef.componentInstance.dialogBaslik = baslik;
  this.alertDialogRef.componentInstance.dialogMesaj = s.mesaj ;
  this.alertDialogRef.componentInstance.dialogIslem = s.islem;
  
  this.alertDialogRef.afterClosed().subscribe(d =>{
    
    
  });
  
}
}
