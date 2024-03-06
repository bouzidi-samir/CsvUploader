import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvUploadComponent } from './component/csv-upload.component';
import { CsvUploadDirective } from './directive/csv-upload.directive';




@NgModule({
  declarations: [
    CsvUploadComponent,
    CsvUploadDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class CsvUploadModule { }
