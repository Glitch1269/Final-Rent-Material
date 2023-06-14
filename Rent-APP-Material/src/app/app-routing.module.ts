import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/Home-Page/Home-Page.component';
import { LoginComponent } from './Components/Login/Login.component';
import { KategoriComponent } from './Components/Kategori/Kategori.component';
import { KullanicilarComponent } from './Components/kullanicilar/kullanicilar.component';
import { LoginDialogComponent } from './Dialogs/login-dialog/login-dialog.component';
import { ArabaComponent } from './Components/Araba/Araba.component';
import { AuthGuard } from './Services/AuthGuard';
import { UyeHomepageComponent } from './Components/UyeComponents/uye-Homepage/uye-Homepage.component';
import { UyeArabaDetaylariComponent } from './Components/UyeComponents/uye-ArabaDetaylari/uye-ArabaDetaylari.component';
import { YakitDialogComponent } from './Dialogs/yakit-dialog/yakit-dialog.component';
import { Yakit } from './Models/Yakit';
import { YakitComponent } from './Components/Yakit/Yakit.component';

const routes: Routes = [
  {
    path: 'adminPage',
    component : HomePageComponent,
    canActivate : [AuthGuard],
    data : {
      yetkiler : ['Admin'],
      return : 'login'
    }
  },
  {
    path: '',
    component : UyeHomepageComponent
  },
  {
    path: 'uyeArabaPage/:carId',
    component : UyeArabaDetaylariComponent
  },
  {
    path: 'login',
    component : LoginComponent,
  },
  {
    path: 'kategori',
    component : KategoriComponent,
    canActivate : [AuthGuard],
    data : {
      yetkiler : ['Admin'],
      return : "login"
    }
  },
  {
    path: 'kullanicilar',
    component : KullanicilarComponent,
    canActivate : [AuthGuard],
    data : {
      yetkiler : ['Admin'],
      return : "login"
    }
  },
  
  {
    path: 'yakitlar',
    component : YakitComponent,
    canActivate : [AuthGuard],
    data : {
      yetkiler : ['Admin'],
      return : "login"
    }
  },
  {
    path: 'login-dialog',
    component : LoginDialogComponent
  },
  {
    path: 'araba/:carId',
    component : ArabaComponent,
    canActivate : [AuthGuard],
    data : {
      yetkiler : ['Admin'],
      return : "login"
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
