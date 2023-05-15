import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

type User = {
  username: string;
  email: string;
  secret: string;
  questionAnswer: string;
  gender: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('userForm', { static: false })
  userForm: NgForm;
  genders = ['male', 'female'];
  formSubmitted = false;

  user: User = {
    username: '',
    email: '',
    secret: '',
    questionAnswer: '',
    gender: ' ',
  };

  suggestUserName() {
    const suggestedName = 'Superuser';
    console.log(this.userForm.form);

    this.userForm.form.patchValue({
      username: suggestedName,
      secretData: {
        questionAnswer: suggestedName,
      },
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    this.user.username = this.userForm.value.username;
    this.user.email = this.userForm.value.email;
    this.user.secret = this.userForm.value.secret;
    this.user.questionAnswer = this.userForm.value.questionAnswer;
    
    this.userForm.reset();
  }
}
