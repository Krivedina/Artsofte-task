import {Component} from '@angular/core';
import {LocalStorageControllerService} from '../local-storage-controller/local-storage-controller.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})
export class HistoryComponent {

  constructor(private LocalStorageController: LocalStorageControllerService) {
  }

  public deleteFieldsFromLocalStorage(id) {
    this.LocalStorageController.deleteFields(id);
  }

  public createTableCardNumber(cardNumber) {
    const secretPart = ' **** **** ';
    const cardNumberArray = cardNumber.split('');
    const firstPart = cardNumberArray.slice(0, 4).join('');
    const secondPart = cardNumberArray.slice(15).join('');
    return firstPart + secretPart + secondPart;
  }

  public getLocalStorageData() {
    return this.LocalStorageController.getArrayOfRecord();
  }

}
