import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from './../services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, firestore } from 'firebase/app';
import { ToastController, NavController, IonInfiniteScroll } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  videourl: string
  // posts: posts[] = []
  posts = new Set<posts>();
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public navCtrl: NavController,
    public sanitizer: DomSanitizer,
    public auth: AngularFireAuth,
    public toastController: ToastController,
    public nav: NavController,
    public fireStore: AngularFirestore,
    public user: UserService,
    private storage: Storage) {

    this.videourl = "https://www.youtube.com/watch?v=HXEnjsHpSTc&list=PLYxzS__5yYQnpK36-GJjm7IEAuHR7IExa&index=6"
    const videoId = this.getId(this.videourl);
    this.videourl = 'https://www.youtube.com/embed/' + videoId;
    console.log(this.videourl)
  }
  ionViewWillEnter	(){
    console.log("aaaaaaaa");
    
    this.getData();
  }
  ngOnInit() {
    
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
      console.log("Aaaaaa");
      
      this.posts= new Set<posts>();
      snapshot.forEach(doc => {
        if (doc.data()['posts'] != null && doc.data()['posts'] != undefined) {
          doc.data().posts.forEach((a: posts) => {
              this.posts.add(a)
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

  toggleInfiniteScroll() {
    // this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
export interface posts {
  url: string
  title: string
  description: string
}
