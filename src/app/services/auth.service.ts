import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({ providedIn: 'root' })
export class NameGuard implements CanActivate {
  uid :any
  constructor(private storage: Storage,private nav : NavController
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.storage.get('uid').then((val) => {
      this.uid = val
      if(val!=""||val!=null)
      return true;
    });
    this.nav.navigateForward(['login'])
    return false;
  }
}