import { Injectable } from '@angular/core';
import { Person } from '../model/Person';

@Injectable({
  providedIn: 'root'
})
export class CsvUploadService {

  readonly NAME_REGEX : RegExp = /^[a-zA-ZÀ-ÿ]+$/;
  readonly MAIL_REGEX : RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  readonly DOMAIN_NAME : string = "abylsen.com";
  errorMessage!: string;

  constructor() { }

  /**
   * extractUsersFromFile: 
   * - Retrieve rows from a csv file content to map it in a Person object.
   * - Store each object created in an array.
   * @param text : text retrieve from the csv file. 
   * @returns 
   */
  public extractUsersFromFile(text: string) : Person[] {

    const propertyNames = text.slice(0, text.indexOf('\n')).split(',');
    const dataRows = text.slice(text.indexOf('\n') + 1).trim().split('\n'); 
    let personList: Person[] = [];

    dataRows.forEach(row => {
        let values = row.split(',');
        let obj: any = {};

        for (let index = 0; index < propertyNames.length; index++) {
            let propertyName: string = propertyNames[index].trim(); 
            propertyName = propertyName.toLowerCase();
            let val: any = values[index].trim();
            if (val === '') 
                val = null;
            if (propertyName === "email") 
                val = val.replace(/\r$/, '');
            obj[propertyName] = val;
        }
        personList.push(obj);
    });
    return personList;
  }

  /**
   * checkCsvDatasFormat: Check the csv file content.
   * @param personList 
   * @returns true if the csv file content is valid, false if it is not.
   */
  public checkCsvDatasFormat(personList: Person[]) : boolean{
    
    for (const person of personList) {
      if(!this.checkNameFormat(person.nom) || !this.checkNameFormat(person.prenom) || !this.checkMailFormat(person.email))
        return false
    }
    return true;
  }

  /**
   * checkNameFormat: Check if :
   * - the name in paramter has less than 120 charaters.
   * - the name contains only alpha characters.
   * @param name 
   * @returns 
   */
  public checkNameFormat(name: string): boolean {

    if (name?.length > 120 || !/^[a-zA-ZÀ-ÿ]+$/.test(name)) {
      this.setErrorMessage(
      "Bad Csv file content: Please check that the firstname and the name have contain only alpha charcaters."
      );
      return false;
    }
    return true;
  }
  
  /**
   *  checkNameFormat: Check if :
   * - the email name has the email foramt.
   * - the email contains the good domain name. 
   * @param email 
   * @returns 
   */
  public checkMailFormat(email: string): boolean {

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexEmail.test(email)){
      this.setErrorMessage("Bad Csv file content: Please check the email format.");
      return false;
    }
    if (email?.split('@')[1] !== this.DOMAIN_NAME) {
      this.setErrorMessage("Bad Csv file content: Please check the email domain.");
      return false;
    }
    return true;
  }

  public setErrorMessage(message: string) {
    this.errorMessage = message;
  }
}



