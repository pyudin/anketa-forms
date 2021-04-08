import { AbstractControl } from '@angular/forms';

export function emailValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const valid = /^\S+@\S+\.\S+$/.test(control.value);
  return valid ? null : { wrongEmail: { value: control.value } };
}
