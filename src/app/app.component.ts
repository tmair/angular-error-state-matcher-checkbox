import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form1: FormGroup;
  form2: FormGroup;

  errorStateMatcher: ErrorStateMatcher = {
    isErrorState(control: AbstractControl | null) {
      console.log(control?.invalid, control?.touched);
      return !!(control?.invalid && control?.touched);
    },
  };

  constructor(formBuilder: FormBuilder) {
    this.form1 = formBuilder.group({
      checkbox: formBuilder.control(false, Validators.requiredTrue),
    });
    this.form2 = formBuilder.group({
      checkbox: formBuilder.control(false, Validators.requiredTrue),
    });
  }

  onSubmit(event: any) {
    if (this.form1.invalid) {
      return;
    }

    this.form1.reset();
  }
}
