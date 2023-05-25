import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TodoserviceService } from 'src/app/service/todoservice.service';
import { UserserviceService } from 'src/app/service/userservice.service';
import { TASK } from 'src/model/task';
import { EdittaskComponent } from '../edittask/edittask.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-incompletedtask',
  templateUrl: './incompletedtask.component.html',
  styleUrls: ['./incompletedtask.component.css'],
})
export class IncompletedtaskComponent implements OnInit {
  isCompleted: boolean = false;
  showMessage: boolean = true;
  ngOnInit(): void {
    this.getTaskByCompletedStatus(this.isCompleted);
  }
  constructor(
    private task: TodoserviceService,
    private service: UserserviceService,
    private router: Router,

  ) {}


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
  updateTaskStatus(task: TASK) {
    task.updatedTask = this.dateTime;
    this.task.updateTaskStatus(task).subscribe((result) => {
      alert('Task Added to Completed Task List');
      this.getTaskByCompletedStatus(this.isCompleted);
      this.router.navigateByUrl('header');
    });
  }

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

  todaydates: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-in');

  isDueDateTask(allTask: any): boolean {
    return allTask.dueDateTime === this.todaydates;
  }
  isPreviousDateTask(allTask: any): boolean {
    return allTask.dueDateTime < this.todaydates;
  }
}
