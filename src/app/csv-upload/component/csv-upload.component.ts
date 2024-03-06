import { Component } from '@angular/core';
import { CsvUploadService } from '../service/csv-upload.service';
import { Person } from '../model/Person';

@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.css']
})
export class CsvUploadComponent {

  constructor(private csvUploadService : CsvUploadService) {}

  file: any;
  importedData: Array<Person> = [];
  
  private async getTextFromFile(event: any) {
    const file: File = event.target.files[0];
    let fileContent = await file.text();    
    return fileContent;
  }
  
  public async importDataFromCSV(event: any) {
    this.file = event.target.file
    let fileContent = await this.getTextFromFile(event);
    this.importedData = this.csvUploadService.extractUsersFromFile(fileContent);
    if (!this.csvUploadService.checkCsvDatasFormat(this.importedData))
        console.log(this.csvUploadService.errorMessage)
    else
        console.log(this.importedData);
  }

}
