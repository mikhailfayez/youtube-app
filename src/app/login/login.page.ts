import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usernaem: string
  password: string
  constructor(
    public auth: AngularFireAuth,
    public user: UserService,
    public nav: NavController,
    public toastController: ToastController,
    private storage: Storage, public loadingController: LoadingController

  ) {
  }
  ngOnInit() {
  }
  async login() {
    try {
      this.presentLoading()
      const res = await this.auth.signInWithEmailAndPassword(this.usernaem + "@skym.com", this.password);
      console.log(res);
      if (res.user) {
        this.user.setUser({
          username: this.usernaem,
          uid: res.user.uid
        })
        const name = this.usernaem.split('@')[0]
        this.storage.set('uid', res.user.uid);
        this.storage.set('username', name);
        this.presentToast('success', 'You have been loged in  successuflly')
        
        this.nav.navigateForward(['tabs'])
      }
    } catch (error) {
      if (error == 'auth/user-not-found') {
        this.presentToast('dange', 'Invalid username')
        
      }
      if (error == 'auth/wrong-password') {
        this.presentToast('danger', 'Invalid password')
        
      }
      this.presentToast('danger', 'Invalid username or password  ')
      console.dir(error)
    }
  }

  async presentToast(type: string, message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: type
    });
    toast.present();
  }
  logout() {
    this.storage.clear()
    this.auth.signOut();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
