import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { IonTextAvatar } from 'ionic-text-avatar';

import { ProfilePage } from './profile.page';
import { RbLetterAvatarModule } from 'rb-letter-avatar'; // <-- import the module
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,RbLetterAvatarModule,AngularFireAuthModule,  ReactiveFormsModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
