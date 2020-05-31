import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from './../services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, firestore } from 'firebase/app';
import { ToastController, NavController, IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  youtubeUrl = ""
  posts = new Set<posts>();
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(public navCtrl: NavController,
    public sanitizer: DomSanitizer,
    public auth: AngularFireAuth,
    public toastController: ToastController,
    public nav: NavController,
    public fireStore: AngularFirestore,
    public user: UserService,
    private storage: Storage,
    public loadingController: LoadingController

  ) {

  }
  ionViewWillEnter() {
    this.getData();
  }
  ngOnInit() {
    this.presentLoading()
    this.getData();

  }
  getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }
  async getData() {
    const snapshot = await this.fireStore.collection('users').get().subscribe(snapshot => {
      this.posts = new Set<posts>();
      snapshot.forEach(doc => {
        if (doc.data()['posts'] != null && doc.data()['posts'] != undefined) {
          doc.data().posts.forEach((a: posts) => {
            this.posts.add(a)
            if (this.posts.size > 0) {
              var it = this.posts.values();
              var first = it.next();
              this.youtubeUrl = first.value.url
            }
          })
        }
      });
    })
  }
  loadData(event) {
    // setTimeout(() => {
    //   console.log('Done');
    //   event.target.complete();

    //   // App logic to determine if all data is loaded
    //   // and disable the infinite scroll
    //   if (this.posts.size== 1000) {
    //     event.target.disabled = true;
    //   }
    // }, 500);
  }
  onClick(post) {
    this.youtubeUrl = post.url
  }
  toggleInfiniteScroll() {
    // this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
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
export interface posts {
  url: string
  title: string
  description: string
  imagUrl: string

}
