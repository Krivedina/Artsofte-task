import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageControllerService {
  constructor() {
  }

  public getArrayOfRecord() {
    return Object.values(localStorage).map(record => JSON.parse(record));
  }

  public checkKeyExist(urlId) {
    return Object.keys(localStorage).find(id => id === urlId);
  }

  public createRecordToStorage(data) {
    const uniqueId = this.createNewId();
    const newRecord = this.createNewRecord(data, uniqueId);
    localStorage.setItem(uniqueId.toString(), JSON.stringify(newRecord));
  }

  private createNewRecord(data, uniqueId) {
    return {id: uniqueId, date: this.createValidDate(), cardsFields: data};
  }

  private createValidDate() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1 < 10 ? '0' + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1;
    return currentDay + '.' + currentMonth + '.' + currentDate.getFullYear();

  }

  public createNewId() {
    const randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    return randomArray[0];
  }

  public getSpecificFields(id) {
    console.log(JSON.parse(localStorage.getItem(id)));
    return JSON.parse(localStorage.getItem(id)).cardsFields;
  }

  public deleteFields(id) {
    localStorage.removeItem(id);
  }
}
