import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from './shared/email.validator';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [''],
      framework: ['', Validators.required],
      frameworkVersion: [''],
      email: ['', [Validators.required, emailValidator]],
      hobbies: this.fb.array([
        this.fb.group({
          name: [''],
          duration: [''],
        }),
      ]),
    });
  }

  onSubmit() {
    console.log(this.registrationForm.value);
  }

  addHobby() {
    this.hobbies.push(
      this.fb.group({
        name: [''],
        duration: [''],
      })
    );
  }

  removeHobby(index: number): void {
    this.hobbies.removeAt(index);
  }

  onFrameworkChange(e) {
    console.log('e', e.target.value);
    const target = e.target.value;
    this.versions = this.frameworks.find((el) => el.value === target).versions;
    this.frameworkVersion.enable();
  }

  get firstName() {
    return this.registrationForm.get('firstName');
  }
  get lastName() {
    return this.registrationForm.get('lastName');
  }
  get dateOfBirth() {
    return this.registrationForm.get('dateOfBirth');
  }
  get framework() {
    return this.registrationForm.get('framework');
  }
  get frameworkVersion() {
    return this.registrationForm.get('frameworkVersion');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get hobbies(): FormArray {
    return this.registrationForm.get('hobbies') as FormArray;
  }
}
