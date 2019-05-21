import {AbstractControl} from '@angular/forms';

export class DebtValidation {

  static DuplicateUser(AC: AbstractControl) {
    const creditor = AC.get('creditor').value;
    const debtor = AC.get('debtor').value;
    if (creditor === debtor) {
      AC.get('creditor').setErrors({SameUser: true});
    } else {
      return null;
    }
  }
}
