import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

import { ApiService } from "./api.service";
import { MyAlertService } from "./my-Alert.service";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        public apiServis: ApiService,
        public alert: MyAlertService,
        public router: Router
    ) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var yetkiler = route.data["yetkiler"] as Array<string>;
        var gitUrl = route.data["return"] as string;
        if (!this.apiServis.oturumKontrol() || !yetkiler || !yetkiler.length) {
            this.router.navigate([gitUrl]);
            return false;
        }
        var sonuc: boolean = false;

        sonuc =this.apiServis.YetkiKontrol(yetkiler);
        if (!sonuc){
            this.router.navigate([gitUrl])
        } 
        return sonuc;
    }


}