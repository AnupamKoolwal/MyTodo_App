import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TodoserviceService } from 'src/app/service/todoservice.service';
import { UserserviceService } from 'src/app/service/userservice.service';
import { TASK } from 'src/model/task';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {
  ngOnInit(): void {
    this.allTask;

  }

  page: number = 1;
  count: number = 0;
  cardSize: number = 6;
  cardSizes: any = [6,3,9];




  @Input()
  allTask: TASK[] = [];

  constructor(private task: TodoserviceService, private service: UserserviceService, private router: Router) { }

  deleteTaskById(taskId: any) {
    this.task.deleteTaskById(taskId).subscribe({
      next: (data) => {
        alert("Task Deleted")
        location.reload();
      },
      error: (error) => {
        alert(error + "not deleted");

      }
    });
  }
  updateTaskStatus(task: TASK) {
    this.task.updateTaskStatus(task).subscribe(result => {
      alert("Task Added to Completed Task List")
    });
  }
  logout() {
    this.service.logOutUser();
    this.router.navigateByUrl("login");
  }

  isHighPriority(allTask: any): boolean {
    return allTask.priority === 'high';
  }

  isMediumPriority(allTask: any): boolean {
    return allTask.priority === 'medium';
  }

  isLowPriority(allTask: any): boolean {
    return allTask.priority === 'low';
  }

  onCardDataChange(event: any) {
    this.page = event;
    this.allTask;

  }

  onCardSizeChange(event: any): void {
    this.cardSize = event.target.value;
    this.page = 1;
    this.allTask;
  }

}
