import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

const MALE_GENDER = 'male';
const FEMALE_GENDER = 'female';

type Gender = typeof MALE_GENDER | typeof FEMALE_GENDER;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  genders: Gender[] = [MALE_GENDER, FEMALE_GENDER];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  formControlNames = {
    username: 'username',
    email: 'email',
    gender: 'gender',
  };

  formControlConfig = [
    {
      name: this.formControlNames.username,
      label: 'Username',
      type: 'text',
      validator: [Validators.required],
    },
    {
      name: this.formControlNames.email,
      label: 'Email',
      type: 'email',
      validator: [Validators.required, Validators.email],
    },
    {
      gender: this.formControlNames.gender,
      label: 'Gender',
      type: 'select',
      validator: [],
    },
  ];

  ngOnInit() {
    const initialGender: Gender = MALE_GENDER;

    this.signupForm = new FormGroup({
      [this.formControlNames.username]: new FormControl('Jean', [
        Validators.required,
        this.usernameValidator,
      ]),
      [this.formControlNames.email]: new FormControl(
        'jean@hotmail.fr',
        [Validators.required, Validators.email],
        this.forbiddenEmails
      ),
      [this.formControlNames.gender]: new FormControl(initialGender),
      hobbies: new FormArray([]),
    });

    this.signupForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  onEmailChange() {
    // console.log(this.signupForm.get(this.formControlNames.email).value);
  }

  onAddHobby() {
    // add new control to the form
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
    console.log(this.signupForm.get('hobbies'));
  }

  onRemoveHobby(index: number) {
    // remove control from the form
    (<FormArray>this.signupForm.get('hobbies')).removeAt(index);
  }

  get controls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }

  usernameValidator = (control: FormControl): { [s: string]: boolean } => {
    if (this.forbiddenUsernames.includes(control.value)) {
      return { nameIsForbidden: true };
    }

    return null;
  };

  forbiddenEmails = (
    control: FormControl
  ): Promise<any> | Observable<{ emailIsForbidden: boolean }> => {
    return of(control.value).pipe(
      map((value) =>
        value === 'test@test.com' ? { emailIsForbidden: true } : null
      ),
      delay(1000)
    );
  };

  // forbiddenEmails = (
  //   control: FormControl
  // ): Promise<any> | Observable<{ emailIsForbidden: boolean }> => {
  //   return new Observable((observer) => {
  //     setTimeout(() => {
  //       if (control.value === 'test@test.test') {
  //         observer.next({ emailIsForbidden: true });
  //       } else {
  //         observer.next(null);
  //       }
  //       observer.complete();
  //     }, 1000);
  //   });
  // };
}

// return new Promise<{ emailIsForbidden: boolean }>((resolve, reject) => {
//   setTimeout(() => {
//     if (control.value === 'test@test.test') {
//       resolve({ emailIsForbidden: true });
//     }
//     resolve(null);
//   }, 1500);
// });
