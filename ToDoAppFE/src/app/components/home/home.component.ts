import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserserviceService } from 'src/app/service/userservice.service';
import { Router } from '@angular/router';
import { TodoserviceService } from 'src/app/service/todoservice.service';
import { USER } from 'src/model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public service: UserserviceService,
    private router: Router,
    private task: TodoserviceService
  ) {}
  isScreenLoaded = false;

  ngOnInit(): void {
    this.getUserName();
  }

  userdetails: USER = {
    emailId: '',
    password: '',
    name: '',
    phNo: '',
    otp: '',
    profileImg:''
  };

  getUserName() {
    this.task.getUserName().subscribe(
      (data) => {
        this.userdetails = data;
        console.log(this.userdetails);
        window.onload;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  tooltipText = 'logout';
  logout() {
    this.service.isLoggedinUser = false;
    this.service.logOutUser();
    this.router.navigateByUrl('login');
    location.reload();
  }

  myMargin: string = '10px';

  changeMargin1: boolean = true;

  changeMargin() {
    if (this.changeMargin1) {
      this.myMargin = '200px'; // new margin value
      this.changeMargin1 = false;
    } else {
      this.myMargin = '10px'; // new margin value
      this.changeMargin1 = true;
    }
  }
}
