import { UserService } from './../services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, firestore } from 'firebase/app';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userPost: any
  uid: any
  username: any
  oldPassword: string
  confirmPassword: string
  newPassword: string
  currentuser: any
  form: any
  passwordMatch: any
  constructor(
    public ngFireAuth: AngularFireAuth,
    public toastController: ToastController,
    public nav: NavController,
    public fireStore: AngularFirestore,
    public user: UserService,
    private storage: Storage,
    public loadingController: LoadingController
  ) {
    // const auths = this.ngFireAuth.auth.
    // oldPassword: new FormControl('', Validators.required)
    this.form = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ])
      , confirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ])
    });
    this.storage.get('uid').then((val) => {
      this.uid = val

    });
  }

  ngOnInit() {
  }
  logout() {
    this.storage.clear()
    this.ngFireAuth.signOut();
    this.nav.navigateForward(['login'])
    this.storage.clear()
  }

  cahngePassword() {
    if (this.confirmPassword = this.newPassword) {
      this.logout()
      this.presentLoading()

      const that = this
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          user.updatePassword(that.newPassword).then(function () {
            that.presentToast('success', 'Password has been changed successuflly')

          }).catch(function (error) {
            console.dir(error)
            console.log("sssss" + error);

            if (error.code == 'auth/weak-password') {
              that.presentToast("danger", "Weak password   ")
            }
          });
          that.currentuser = user
        } else {
        }
      });

    }
    else {
      this.presentToast("warning", "New Password  doesn't match with confirm password ")
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
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
