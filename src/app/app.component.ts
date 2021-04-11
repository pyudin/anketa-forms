import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { emailValidator } from './shared/email.validator';

import { debounceTime, delay, map, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  registrationForm: FormGroup;

  frameworks = [
    {
      value: 'angular',
      name: 'Angular',
      versions: ['1.1.1', '1.2.1', '1.3.3'],
    },
    { value: 'react', name: 'React', versions: ['2.1.2', '3.2.4', '4.3.1'] },
    { value: 'vue', name: 'Vue', versions: ['3.3.1', '5.2.1', '5.1.3'] },
  ];

  versions: string[];
  versionStatus = true;
  submitted = false;

  hobbyDuration = ['2 month', '6 month', '1 year', 'over 2 years'];

  takenEmails = ['test@test.test'];
  checkIfEmailExists(email: string): Observable<boolean> {
    return of(this.takenEmails.includes(email)).pipe(delay(2000));
  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfEmailExists(control.value).pipe(
        map((res) => (res ? { usernameExists: true } : null)),
        take(1)
      );
    };
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formInit();
    this.email.valueChanges.pipe(debounceTime(500)).subscribe(console.log);
  }

  private formInit() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      framework: ['', Validators.required],
      frameworkVersion: [{ value: '', disabled: true }, [Validators.required]],
      email: ['', [Validators.required, emailValidator]],
      hobbies: this.fb.array([
        this.fb.group({
          name: ['', Validators.required],
          duration: ['', Validators.required],
        }),
      ]),
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (!this.formIsValid) {
      return;
    }

    console.log(this.registrationForm.value);
  }

  public addHobby() {
    this.hobbies.push(
      this.fb.group({
        name: [''],
        duration: [''],
      })
    );
  }

  public removeHobby(index: number): void {
    this.hobbies.removeAt(index);
  }

  public onFrameworkChange(e) {
    const target = e.value;
    this.versions = this.frameworks.find((el) => el.value === target).versions;
    this.frameworkVersion.enable();
  }

  get formIsValid() {
    return (
      this.registrationForm.valid &&
      this.registrationForm.controls.hobbies.valid &&
      this.registrationForm.controls.hobbies.value.length > 0
    );
  }

  get firstName(): AbstractControl {
    return this.registrationForm.get('firstName');
  }
  get lastName(): AbstractControl {
    return this.registrationForm.get('lastName');
  }
  get dateOfBirth(): AbstractControl {
    return this.registrationForm.get('dateOfBirth');
  }
  get framework(): AbstractControl {
    return this.registrationForm.get('framework');
  }
  get frameworkVersion(): AbstractControl {
    return this.registrationForm.get('frameworkVersion');
  }
  get email(): AbstractControl {
    return this.registrationForm.get('email');
  }
  get hobbies(): FormArray {
    return this.registrationForm.get('hobbies') as FormArray;
  }
}
