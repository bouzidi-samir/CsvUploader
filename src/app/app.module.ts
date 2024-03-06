import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CsvUploadModule } from './csv-upload/csv-upload.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CsvUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
