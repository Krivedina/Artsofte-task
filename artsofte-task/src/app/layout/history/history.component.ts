import {Component} from '@angular/core';

import {LocalStorageControllerService} from '../local-storage-controller/local-storage-controller.service';

@Component({
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})
export class HistoryComponent {

  constructor(private LocalStorageController: LocalStorageControllerService) {
  }

  public deleteFieldsFromLocalStorage(id: number) {
    this.LocalStorageController.deleteFields(id);
  }

  public getHeaderTitles(): string[] {
    return ['Номер', 'Карта плательщика', 'Карта получателя', 'Сумма', 'Дата выполнения', 'Действие'];
  }


  public createTableCardNumber(cardNumber: number) {
    const secretPart = ' **** **** ';
    const cardNumberArray = cardNumber.toString().split('');
    const firstPart = cardNumberArray.slice(0, 4).join('');
    const secondPart = cardNumberArray.slice(15).join('');
    return firstPart + secretPart + secondPart;
  }

  public getLocalStorageData() {
    return this.LocalStorageController.getArrayOfRecord();
  }

}
