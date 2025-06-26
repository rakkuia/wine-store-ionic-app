import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VinhosPageRoutingModule } from './vinhos-routing.module';

import { VinhosPage } from './vinhos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VinhosPageRoutingModule,
    VinhosPage
  ],
})
export class VinhosPageModule {}
