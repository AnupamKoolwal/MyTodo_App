import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoserviceService } from 'src/app/service/todoservice.service';
import { UserserviceService } from 'src/app/service/userservice.service';
import { TASK } from 'src/model/task';

@Component({
  selector: 'app-archieved',
  templateUrl: './archieved.component.html',
  styleUrls: ['./archieved.component.css'],
})
export class ArchievedComponent implements OnInit {
  isArchive: boolean = true;

  ngOnInit(): void {
    this.getAllArchiveTask(this.isArchive);
  }

  showMessage: boolean = true;
  constructor(
    private task: TodoserviceService,
    private service: UserserviceService,
    private router: Router
  ) {}

  allArchievedTask: TASK[] = [];
  getAllArchiveTask(isArchive: boolean) {
    this.task.getAllArchiveTask(this.isArchive).subscribe(
      (next) => {
        this.allArchievedTask = next;

        if (
          !(this.allArchievedTask == null || this.allArchievedTask.length == 0)
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
    console.log(this.allArchievedTask);
  }
  deleteTaskById(taskId: string) {
    this.task.deleteTaskById(taskId).subscribe(
      (result) => {
        alert('Task Deleted');
        this.getAllArchiveTask(this.isArchive);
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
  unArchiveTask(task: TASK) {
    task.updatedTask = this.dateTime;
    this.task.updateTaskAsArchiveTask(task).subscribe(
      (result) => {
        alert('Task UnArchieved');
        this.getAllArchiveTask(this.isArchive);
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
