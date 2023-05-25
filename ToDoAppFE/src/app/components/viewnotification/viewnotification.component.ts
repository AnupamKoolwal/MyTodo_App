import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TodoserviceService } from 'src/app/service/todoservice.service';
import { TASK } from 'src/model/task';

@Component({
  selector: 'app-viewnotification',
  templateUrl: './viewnotification.component.html',
  styleUrls: ['./viewnotification.component.css'],
})
export class ViewnotificationComponent implements OnInit {
  constructor(private task: TodoserviceService, private http: HttpClient) {}
  showMessage: boolean = true;

  notifications: any;

  ngOnInit(): void {
    this.getAllTask1();
  }

  getAllTask1() {
    this.task.getAllTaskNotification().subscribe(
      (data) => {
        this.notifications = data.data.notification;
        this.notifications.slice().sort(this.getSort());

        if (!(this.notifications == null || this.notifications.length == 0)) {
          this.showMessage = false;
        } else {
          this.showMessage = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(this.notifications);
  }
  getSort() {
    this.notifications.sort((a: any, b: any) => {
      if (a.updatedTask > b.updatedTask) {
        return -1; // a should come before b in the sorted order
      } else if (a.updatedTask < b.updatedTask) {
        return 1; // a should come after b in the sorted order
      } else {
        return 0; // a and b are equal in the sorted order
      }
    });
  }
}
