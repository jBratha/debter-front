import {AbstractControl, ValidatorFn} from '@angular/forms';

export class DebtValidation {

  static DuplicateUser: ValidatorFn = (AC: AbstractControl) => {
    const c = AC.get('creditor');
    const d = AC.get('debtor');
    const cV = c.value;
    const dV = d.value;

    if (cV !== null && dV !== null) {
      if (cV !== "" && dV !== "" && cV === dV) {
        c.setErrors({'required': true});
        d.setErrors({'required': true});
        return {sameUser: true};
      }
      c.setErrors((cV === "") ? {'required': true} : null);
      d.setErrors((dV === "") ? {'required': true} : null);

    }
    return null;
  }
}
