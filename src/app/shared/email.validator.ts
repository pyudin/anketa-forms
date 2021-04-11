import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailValidator(
  control: AbstractControl
): ValidationErrors | null {
  const valid = /^\S+@\S+\.\S+$/.test(control.value);
  return valid ? null : { wrongEmail: { value: control.value } };
}
