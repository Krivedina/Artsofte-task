import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {ValidateForm} from './validate-form';
import {LocalStorageControllerService} from '../local-storage-controller/local-storage-controller.service';

@Component({
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.less']
})

export class TransactionComponent implements OnInit {

  public transactionForm: FormGroup;
  public monthList: number[] = [];
  public yearList: number[] = [];
  public resultMessage: string;
  public resultMessageStatus: boolean;

  private currentValidFields: IFields | null;
  private paramsId: number;

  constructor(private localStorageController: LocalStorageControllerService, private router: ActivatedRoute) {
    this.createMonthList();
    this.createTenNextYear();
    this.resultMessageStatus = false;
    this.transactionForm = ValidateForm.TRANSACTION_GROUP;
  }

  ngOnInit() {
    this.transactionForm.valueChanges.subscribe(fields => this.checkValidationForm(fields));
    this.paramsId = this.router.snapshot.params.id;
    if (this.paramsId && this.localStorageController.checkKeyExist(this.paramsId)) {
      this.refillFields();
    }
  }

  refillFields() {
    const currentId = this.router.snapshot.params.id;
    const refillData = this.localStorageController.getSpecificFields(currentId);
    this.transactionForm.setValue(refillData);
    this.checkValidationForm(this.currentValidFields);
  }

  sendCardDataToLocalStorage() {
    try {
      this.localStorageController.createRecordToStorage(this.currentValidFields);
      this.resultMessage = 'Платеж прошел успешно!';
    } catch (e) {
      console.error(e);
      this.resultMessage = 'Произошла ошибка при операции!';
    } finally {
      this.resultMessageStatus = true;
      setTimeout(() => this.resultMessageStatus = false, 3000);
      this.transactionForm.reset();
    }
  }

  checkValidationForm(fields: IFields) {
    this.currentValidFields = this.transactionForm.valid ? fields : null;
  }

  checkCorrectChangeSumInput() {
    const currentSumObj = this.transactionForm.controls.transactionSum;
    if (currentSumObj.value < 1) {
      currentSumObj.setValue(1);
    } else if (currentSumObj.value > 1000000) {
      currentSumObj.setValue(1000000);
    }
  }

  createMonthList() {
    for (let i = 1; i < 13; i++) {
      this.monthList.push(i);
    }
  }

  createTenNextYear() {
    const currentDate = new Date();
    const currentYear = parseInt(currentDate.getFullYear().toString().slice(2), 10);
    for (let i = currentYear; i < currentYear + 10; i++) {
      this.yearList.push(i);
    }
  }
}
