import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoserviceService } from 'src/app/service/todoservice.service';
import { UserserviceService } from 'src/app/service/userservice.service';
import { TASK } from 'src/model/task';

@Component({
  selector: 'app-completedtask',
  templateUrl: './completedtask.component.html',
  styleUrls: ['./completedtask.component.css'],
})
export class CompletedtaskComponent implements OnInit {
  isCompleted: boolean = true;
  ngOnInit(): void {
    this.getTaskByCompletedStatus(this.isCompleted);
  }
  constructor(
    private task: TodoserviceService,
    private service: UserserviceService,
    private router: Router
  ) {}

  showMessage: boolean = true;

  allTaskByStatus: TASK[] = [];
  getTaskByCompletedStatus(isCompleted: boolean) {
    this.task.getTaskByCompletedStatus(this.isCompleted).subscribe(
      (next) => {
        this.allTaskByStatus = next;

        if (
          !(this.allTaskByStatus == null || this.allTaskByStatus.length == 0)
        ) {
          this.showMessage = false;
        } else {
          this.showMessage = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(this.allTaskByStatus);
  }
  deleteTaskById(taskId: string) {
    this.task.deleteTaskById(taskId).subscribe(
      (result) => {
        alert('Task Deleted');
        this.getTaskByCompletedStatus(this.isCompleted);
        this.router.navigateByUrl('header');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  now: Date = new Date();
  year: number = this.now.getFullYear();
  month: number = this.now.getMonth() + 1;
  date: number = this.now.getDate();
  hours: number = this.now.getHours();
  minutes: number = this.now.getMinutes();
  seconds: number = this.now.getSeconds();

  formattedDate: string = `${this.year}-${
    this.month < 10 ? '0' + this.month : this.month
  }-${this.date < 10 ? '0' + this.date : this.date}`;
  formattedTime: string = `${this.hours < 10 ? '0' + this.hours : this.hours}:${
    this.minutes < 10 ? '0' + this.minutes : this.minutes
  }:${this.seconds < 10 ? '0' + this.seconds : this.seconds}`;

  dateTime: string = this.formattedDate.concat(' Time - ', this.formattedTime);
  archiveTask(task: TASK) {
    task.updatedTask = this.dateTime;
    this.task.updateTaskAsArchiveTask(task).subscribe(
      (result) => {
        alert('Task Archieved');
        this.getTaskByCompletedStatus(this.isCompleted);
        this.router.navigateByUrl('header');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    this.service.logOutUser();
    this.router.navigateByUrl('login');
  }
}
