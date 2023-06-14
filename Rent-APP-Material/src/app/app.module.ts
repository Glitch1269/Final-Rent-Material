import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './Components/Home-Page/Home-Page.component';
import { MaterialModule } from './material.module';
import { AlertDialogComponent } from './Dialogs/alert-dialog/alert-dialog.component';
import { MyAlertService } from './Services/my-Alert.service';
import { ConfirmDialogComponent } from './Dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from './Services/api.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/Login/Login.component';
import { ArabaDialogComponent } from './Dialogs/Araba-Dialog/Araba-Dialog.component';
import { Form, FormGroup, FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { KategoriComponent } from './Components/Kategori/Kategori.component';
import { KategoriDialogComponent } from './Dialogs/Kategori-Dialog/Kategori-Dialog.component';
import { Kullanicilar } from './Models/Kullanici';
import { KullanicilarComponent } from './Components/kullanicilar/kullanicilar.component';
import { KullanicilarDialogComponent } from './Dialogs/kullanicilar-dialog/kullanicilar-dialog.component';
import { LoginDialogComponent } from './Dialogs/login-dialog/login-dialog.component';
import { ArabaComponent } from './Components/Araba/Araba.component';
import { SafeHTMLPipe } from './Services/safeHTML.pipe';
import { Authinterceptor } from './Services/Authinterceptor';
import { AuthGuard } from './Services/AuthGuard';
import { UyeArabaDetaylariComponent } from './Components/UyeComponents/uye-ArabaDetaylari/uye-ArabaDetaylari.component';
import { UyeHomepageComponent } from './Components/UyeComponents/uye-Homepage/uye-Homepage.component';
import { YakitComponent } from './Components/Yakit/Yakit.component';
import { YakitDialogComponent } from './Dialogs/yakit-dialog/yakit-dialog.component';
@NgModule({
  declarations: [
    
    AppComponent,
    HomePageComponent,
    LoginComponent,
    KategoriComponent,
    KullanicilarComponent,
    ArabaComponent,
    UyeHomepageComponent,
    YakitComponent,
   
    //Dialog Comp
    AlertDialogComponent,
    ConfirmDialogComponent,
    ArabaDialogComponent,
    KategoriDialogComponent,
    KullanicilarDialogComponent,
    LoginDialogComponent,
    UyeArabaDetaylariComponent,
    YakitDialogComponent,
    SafeHTMLPipe,
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
    
  ],
  entryComponents: [
  AlertDialogComponent,ConfirmDialogComponent,ArabaDialogComponent,
  KategoriDialogComponent,KullanicilarDialogComponent,LoginDialogComponent],
  providers: [MyAlertService,ApiService,SafeHTMLPipe,AuthGuard,
    {provide : HTTP_INTERCEPTORS, useClass: Authinterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
