import { Component, Input, OnInit } from '@angular/core';
import { TodoserviceService } from 'src/app/service/todoservice.service';
import { TASK } from 'src/model/task';
import { UserserviceService } from '../service/userservice.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddtaskComponent } from '../components/addtask/addtask.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private h: TodoserviceService,
    public service: UserserviceService,
    private router: Router,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.getAllTask();
  }

  openDialog() {
    this.dialog.open(AddtaskComponent);
  }

  showMessage: boolean = true;
  showDeleteButton1: boolean = false;

  allTask: TASK[] = [];
  getAllTask() {
    this.h.getAllTask().subscribe((data) => {
      this.allTask = data;
      if (!(this.allTask == null || this.allTask.length == 0)) {
        this.showMessage = false;
      } else {
        this.showMessage = true;
      }
      if (!(this.allTask == null || this.allTask.length == 0)) {
        this.showDeleteButton1 = true;
      } else {
        this.showDeleteButton1 = false;
      }
    });
    console.log(this.allTask);
  }

  searched(title: string) {
    if (title == '') {
      this.getAllTask();
    } else {
      this.h.getTaskByTitle(title).subscribe((data) => {
        this.allTask = data;
      });
    }
  }

  filtered(priority: string) {
    if (priority == '') {
      this.getAllTask();
    } else {
      this.h.getTaskByPriority(priority).subscribe((data) => {
        this.allTask = data;
      });
    }
  }

  completionStatus(isCompleted: boolean) {
    this.h.getTaskByCompletedStatus(isCompleted).subscribe(
      (data) => {
        this.allTask = data;
      },
      (err) => {
        // alert('Task Not Found');
      }
    );
  }

  deleteAllTask() {
    const confirmed = window.confirm(
      'Are you sure you want to delete all tasks?'
    );
    if (confirmed) {
      this.h.deleteAllTask().subscribe({
        next: (data) => {
          alert('All Task Deleted Successfully ');

          location.reload();
        },
        error: (error) => {
          alert(error + 'not deleted');
          location.reload();
        },
      });
    }
  }
}
