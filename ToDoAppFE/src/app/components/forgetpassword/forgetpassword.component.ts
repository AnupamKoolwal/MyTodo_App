import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/service/userservice.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
})
export class ForgetpasswordComponent implements OnInit {
  forgetForm: any = this.fb.group({
    emailId: ['', [Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    otp: ['', [Validators.required, Validators.minLength(4)]],
  });
  emailId1: any;

  constructor(
    private fb: FormBuilder,
    private log: UserserviceService,
    private nav: Router,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {}
  enteredPass: any;
  forget: any;
  isClicked: boolean = false;
  onSubmit(): void {
    this.forgetForm.value.emailId = this.emailId1;

    this.log
      .forgetPassword(this.forgetForm.value, this.forgetForm.value.password)
      .subscribe(
        (next) => {
          this.forget = next;
          this.nav.navigateByUrl('login');
          this._snackBar.open('Password Successfully changed !!', 'success', {
            duration: 5000,
          });
        },
        (err) => {
          alert('Wrong otp');
          console.log(err);
          this.forgetForm.reset();
        }
      );
  }
  sendOtp(): void {
    this.log.sendOtp(this.emailId1).subscribe(
      (next) => {
        this._snackBar.open('OTP sent Successfully !!', 'success', {
          duration: 5000,
        });

        this.isClicked = true;
      },
      (err) => {
        alert('Enter Valid Maild Id');
      }
    );
  }
  captchaResolved(captchaResponse: string) {
    console.log('Captcha resolved with response: ', captchaResponse);
  }
}
