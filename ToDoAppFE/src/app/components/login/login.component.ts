import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/service/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any = this.fb.group({
    emailId: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private log: UserserviceService,
    private nav: Router,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {}

  login: any;
  onSubmit(): void {
    this.log.loginUser(this.loginForm.value).subscribe(
      (next) => {
        this.login = next;
        this.log.login(this.login.Token);
        if (this.log.isLoggedin()) {
          this.nav.navigateByUrl('header');

          this._snackBar.open('Successfully LoggedIn !!', 'success', {
            duration: 5000,
          });
        }
      },
      (err) => {
        alert('Try with valid Credentails');
        this.loginForm.reset();
      }
    );
  }
  
}
