import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from '@angular/fire/auth';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule
  ],
  exports: [
    AuthModule
  ]
})
export class CoreModule { }
