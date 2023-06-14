import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Araba } from 'src/app/Models/Araba';
import { FormsModule } from '@angular/forms';
import { Kategori } from 'src/app/Models/Kategori';
import { publishFacade } from '@angular/compiler';
import { ApiService } from 'src/app/Services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Yakit } from 'src/app/Models/Yakit';

@Component({
  selector: 'app-Araba-Dialog',
  templateUrl: './Araba-Dialog.component.html',
  styleUrls: ['./Araba-Dialog.component.css']
})
export class ArabaDialogComponent implements OnInit {
  kategoriler !: Kategori[];
  yakitlar !: Yakit[];
  secKategori !: Kategori;
  secAraba !: Araba;
  dialogBaslik !: string;
  yeniKayit! :Araba;
  islem !: string;
  dataSource: any;

  frm: FormGroup = new FormGroup({
    carId : new FormControl(), 
    carMarka: new FormControl(), 
    carModel: new FormControl(),  
    carYakit: new FormControl(), 
    carYolcu: new FormControl(), 
    carKatId: new FormControl(), 
    carFiyat: new FormControl(), 
    carTelNo: new FormControl(), 
    carResim: new FormControl(), 
    carRate :new FormControl(),
    carKayit :new FormControl(),
    carDuzen :new FormControl(),
  });
  @ViewChild(MatSort) sort !: MatSort;
  constructor(
    public dialogRef : MatDialogRef<ArabaDialogComponent>,
    public frmBuild : FormBuilder,@Inject(MAT_DIALOG_DATA) public data : any,
    public apiServis : ApiService
  ) { this.islem = data.islem;
    
    if(this.islem == "ekle")
      {
      this.dialogBaslik = "Araba Ekle";
      this.yeniKayit = new Araba();
      }
      if(this.islem == "duzenle"){
        
        this.dialogBaslik = "Araba Düzenle"
        this.yeniKayit = data.kayit;
      }

  }

  ngOnInit() {
    this.KategoriListele();
    this.YakitListele();
  
  }

  KategoriListele(){
    this.apiServis.KategoriListele().subscribe((c : any) => {
      this.kategoriler = c;
      this.dataSource = new MatTableDataSource(c);
      console.log(c); 
    })
  }

  YakitListele(){
    this.apiServis.YakitListe().subscribe((c : any) => {
      this.yakitlar = c;
      this.dataSource = new MatTableDataSource(c);
      console.log(c); 
    })
  }
}
