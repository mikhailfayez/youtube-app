import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploaderPageRoutingModule } from './uploader-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UploaderPage } from './uploader.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploaderPageRoutingModule,  ReactiveFormsModule
  ],
  providers: [
],
  declarations: [UploaderPage]
})
export class UploaderPageModule {}
