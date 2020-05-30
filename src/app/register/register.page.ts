import { UserService } from './../services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string
  password: string
  cpassword: string
  constructor(
    public auth: AngularFireAuth,
    public toastController: ToastController,
    public nav: NavController,
    public fireStore: AngularFirestore,
    public user: UserService,
    private storage: Storage, public loadingController: LoadingController


  ) {
  }
  ngOnInit() {
  }
  async register() {
    if (this.cpassword != this.password) {
      return console.error("Password don't match");

    }
    this.presentLoading()
    try {
      const res = await this.auth.createUserWithEmailAndPassword(this.username + "@skym.com", this.password);
      console.log(res);
      this.presentToast('success', 'You have been registered successuflly')
      this.fireStore.doc(`/users/${res.user.uid}`).set({
        Username: this.username
      })
      this.storage.set('uid', res.user.uid);
      this.storage.set('username', this.username.split('@')[0]);
      this.user.setUser({
        username: this.username,
        uid: res.user.uid
      })
      this.nav.navigateForward(['tabs'])

    } catch (error) {
      console.log(error)

      if (error.code == 'auth/weak-password') {
        this.presentToast("danger", "Weak password   ")

      }
      if (error.code == 'auth/email-already-in-use') {
        this.presentToast("danger", "Username already exists")

      }
      // this.presentToast('danger','Username or password are incorrect')
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
