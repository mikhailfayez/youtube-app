import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User
  constructor(private auth: AngularFireAuth) { }

  setUser(user: User) {
    this.user = user

  }
  getUid() {

    return this.user.uid
  }
}



export interface User {
  username: string
  uid: string

} 