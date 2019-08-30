import {Injectable} from '@angular/core';
import {Constant} from './constant';

@Injectable({
  providedIn: 'root'
})


export class LocalStorageControllerService {

  constructor() {
  }

  private addSpecialKeyPrefix(value: string | number): string {
    return Constant.SPECIAL_KEY_PREFIX + value;
  }

  public getArrayOfRecord(): IFields[] {
    const data = Object.keys(localStorage).filter(keys => keys.includes(Constant.SPECIAL_KEY_PREFIX));
    return data.map(key => JSON.parse(localStorage.getItem(key)));
  }

  public checkKeyExist(urlId): string {
    const specialKey = this.addSpecialKeyPrefix(urlId);
    return Object.keys(localStorage).find(id => id === specialKey);
  }

  public createRecordToStorage(data: IFields) {
    const uniqueId = this.createNewId();
    const newRecord = this.createNewRecord(data, uniqueId);
    const specialKey = this.addSpecialKeyPrefix(uniqueId);
    const jsonData = JSON.stringify(newRecord);
    localStorage.setItem(specialKey, jsonData);
  }

  private createNewRecord(data: IFields, uniqueId: number): IRecord {
    const validFormatDate = this.createValidFormatDate();
    return {id: uniqueId, date: validFormatDate, cardsFields: data};
  }

  private createValidFormatDate(): string {
    const currentDate = new Date();
    const currentDay = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1 < 10 ? '0' + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1;
    return currentDay + '.' + currentMonth + '.' + currentDate.getFullYear();

  }

  private createNewId(): number {
    const randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    return randomArray[0];
  }

  public getSpecificFields(id: number): IFields {
    const specialKey = this.addSpecialKeyPrefix(id);
    const necessaryItem = localStorage.getItem(specialKey);
    const jsonParseData = JSON.parse(necessaryItem);
    return jsonParseData.cardsFields;
  }

  public deleteFields(id: number) {
    localStorage.removeItem(this.addSpecialKeyPrefix(id));
  }
}
