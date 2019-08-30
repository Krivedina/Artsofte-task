import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

export class ValidateForm {

  private static PRAYER_NUMBER = new FormControl(null, [Validators.required]);
  private static PRAYER_NAME = new FormControl(null, [Validators.required,
    Validators.pattern(/[a-zA-Z]+ [a-zA-Z]+/)]);
  private static PRAYER_CARD_MONTH = new FormControl(null, [Validators.required]);
  private static PRAYER_CARD_YEAR = new FormControl(null, [Validators.required]);
  private static RECIPIENT_NUMBER = new FormControl(null, [Validators.required]);
  private static TRANSACTION_SUM = new FormControl(null, [Validators.required]);

  public static TRANSACTION_GROUP = new FormGroup(
    {
      prayerName: ValidateForm.PRAYER_NAME,
      prayerNumber: ValidateForm.PRAYER_NUMBER,
      prayerCardMonth: ValidateForm.PRAYER_CARD_MONTH,
      prayerCardYear: ValidateForm.PRAYER_CARD_YEAR,
      recipientNumber: ValidateForm.RECIPIENT_NUMBER,
      transactionSum: ValidateForm.TRANSACTION_SUM
    }, [ValidateForm.validateEqualNumber(), ValidateForm.validateDateCard()]
  );

  private static validateEqualNumber(): ValidatorFn {
    return (group: FormGroup) => {
      return group.controls.prayerNumber.value === group.controls.recipientNumber.value ? {error: 'EqualNumber!'} : null;
    };
  }

  private static validateDateCard(): ValidatorFn {
    return (group: FormGroup) => {
      const currentDate = new Date();
      const currentYear = +(currentDate.getFullYear().toString().slice(2));
      const currentMonth = currentDate.getMonth() + 1;
      const monthField = +group.controls.prayerCardMonth.value;
      const yearField = +group.controls.prayerCardYear.value;
      if (!monthField || !yearField) {
        return null;
      }
      if ((currentYear > yearField) || ((currentYear === yearField) && (currentMonth >= monthField))) {
        return {error: 'ExpiredCard!'};
      }
      return null;
    };
  }
}
