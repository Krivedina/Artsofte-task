import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageControllerService {
  constructor() {
  }

  private specialKeyPrefix = 'card-fields-id:';

  private addSpecialKeyPrefix(value) {
    return this.specialKeyPrefix + value;
  }

  public getArrayOfRecord() {
    const data = Object.keys(localStorage).filter(keys => keys.includes(this.specialKeyPrefix));
    return data.map(key => JSON.parse(localStorage.getItem(key)));
  }

  public checkKeyExist(urlId) {
    const specialKey = this.addSpecialKeyPrefix(urlId);
    return Object.keys(localStorage).find(id => id === specialKey);
  }

  public createRecordToStorage(data) {
    const uniqueId = this.createNewId();
    const newRecord = this.createNewRecord(data, uniqueId);
    const specialKey = this.addSpecialKeyPrefix(uniqueId);
    const jsonData = JSON.stringify(newRecord);
    localStorage.setItem(specialKey, jsonData);
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
    const specialKey = this.addSpecialKeyPrefix(id);
    const necessaryItem = localStorage.getItem(specialKey);
    const jsonParseData = JSON.parse(necessaryItem);
    return jsonParseData.cardsFields;
  }

  public deleteFields(id) {
    localStorage.removeItem(this.addSpecialKeyPrefix(id));
  }
}
