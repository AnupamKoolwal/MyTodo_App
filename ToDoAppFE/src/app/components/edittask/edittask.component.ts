import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TodoserviceService } from 'src/app/service/todoservice.service';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css'],
})
export class EdittaskComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private ms: TodoserviceService,
    private router1: Router,
    private ar: ActivatedRoute,
  ) {}
  taskForm: any;
  todayDate: Date = new Date();
  selectedFile: any = File;
  url: string = '../../../assets/default.jpg';
  todaydates: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-in');
  formDetails: any;

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskId: [],
      title: ['', [Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(8)]],
      priority: ['', [Validators.required]],
      createdDateTime: [this.todayDate],
      imgUrl: [''],
      dueDateTime: ['', [Validators.required, this.getdataValidate]],
      isCompleted: [false],
      isArchive: [false],
      updatedTask:[this.dateTime]
    });

    this.ar.paramMap.subscribe((params) => {
      const titleParam = params.get('title') || 0;

      // const titleParam1=titleParam.
      this.ms.getTaskByTitle(titleParam).subscribe({
        next: (data) => {
          this.formDetails = data;
          this.taskForm.patchValue(data);
        },
        error: (err) => {
          console.error('Error fetching task by title:', err);
        },
      });
    });

    this.ms.getAllTask().subscribe({
      next: (tasks) => {
        console.log('All tasks:', tasks);
      },
      error: (err) => {
        console.error('Error fetching all tasks:', err);
      },
    });
  }
  now: Date = new Date();
  year: number = this.now.getFullYear();
   month: number = this.now.getMonth() + 1;
  date: number = this.now.getDate();
  hours: number = this.now.getHours();
  minutes: number = this.now.getMinutes();
  seconds: number = this.now.getSeconds();

  formattedDate: string = `${this.year}-${this.month < 10 ? '0' + this.month : this.month}-${this.date < 10 ? '0' + this.date : this.date}`;
  formattedTime: string = `${this.hours < 10 ? '0' + this.hours : this.hours}:${this.minutes < 10 ? '0' + this.minutes : this.minutes}:${this.seconds < 10 ? '0' + this.seconds : this.seconds}`;

  dateTime:string = this.formattedDate.concat(" Time - ",this.formattedTime);
  editNote() {
    this.taskForm.updatedTask=this.dateTime;
    this.taskForm.value.imgUrl = this.url;
    this.ms.updateTask(this.taskForm.value).subscribe(
      (data) => {
        alert('Data Updated');
        this.router1.navigateByUrl('header');
      },
      (err) => console.log(err)
    );
  }
  onFileSelected(file: any) {
    if (file.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
    const filedata = file.target.files[0];
  }
  get dueDateTime() {
    return this.taskForm.controls.dueDateTime;
  }
  getdataValidate(ac: AbstractControl) {
    let todaydate = formatDate(new Date(), 'yyyy-MM-dd', 'en-in');
    let dateentered = ac.value;

    if (dateentered > todaydate) {
      return null;
    } else if (todaydate > dateentered) {
      return { ErrorData1: true };
    } else {
      return null;
    }
  }
}
