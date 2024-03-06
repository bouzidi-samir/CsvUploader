import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsvUploadComponent } from './csv-upload/component/csv-upload.component';

const routes: Routes = [
  { path: 'home', component: CsvUploadComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
