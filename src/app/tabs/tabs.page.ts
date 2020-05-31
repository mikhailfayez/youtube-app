import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from './../services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, firestore } from 'firebase/app';
import { ToastController, NavController, IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  role: string = ""
  flag = false
  uid: string
  constructor(public navCtrl: NavController,
    public sanitizer: DomSanitizer,
    public auth: AngularFireAuth,
    public toastController: ToastController,
    public nav: NavController,
    public fireStore: AngularFirestore,
    public user: UserService,
    private storage: Storage,
    public loadingController: LoadingController, private route: ActivatedRoute, private router: Router
  ) {
  }
  ngOnInit() {
    this.getData()
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.uid = params.get('id');
    });
  }
  ionViewWillEnter() {
    this.getData()
  }
  ionViewDidLeave() {
    this.flag = false
  }
  getData() {
    // this.storage.get('uid').then((val) => {
    try {
      const snapshot = this.fireStore.collection('users').doc(this.uid).get().subscribe(snapshot => {
        let data = snapshot.data()
        if (data.role) {
          this.role = data.role
          if (this.role == "admin") {
            this.flag = true
          }
        }
        else {
          this.flag = false
        }
      })
    } catch (error) {
      console.dir(error)
    }
    // });
  }
}
