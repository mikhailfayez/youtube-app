import { UserService } from './../services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, firestore } from 'firebase/app';
import { ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {
  desc: string
  title: string
  url: string
  embedUrl: string
  uid: any
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay:true

  };
  constructor(
    public auth: AngularFireAuth,
    public toastController: ToastController,
    public nav: NavController,
    public fireStore: AngularFirestore,
    public user: UserService,
    private storage: Storage
  ) {
  }
  ngOnInit() {
  }

  save() {
    this.storage.get('uid').then((val) => {
      this.uid = val
      try {
        let res = this.fireStore.doc(`/users/${this.uid}`).update({
          posts: firestore.FieldValue.arrayUnion({
            title: this.title,
            url: this.getYotubeUrl(),
            description: this.desc
          })
        })
        this.presentToast('success', 'You have been registered successuflly')

      } catch (error) {
        console.dir(error)
        this.presentToast('danger', 'Username or password are incorrect')
      }
    });
  }
  async presentToast(type: string, message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: type
    });
    toast.present();
  }
  getYotubeUrl() {

    const videoId = this.getId(this.url);
    this.embedUrl = 'https://www.youtube.com/embed/' + videoId;
    return this.embedUrl
  }
  getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }
}
