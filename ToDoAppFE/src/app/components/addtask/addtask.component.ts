import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { TodoserviceService } from 'src/app/service/todoservice.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css'],
})
export class AddtaskComponent implements OnInit {
  selectedFile: any = File;
  url: string = '../../../assets/default.jpg';
  todaydates: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-in');

  constructor(
    private fb: FormBuilder,
    private ms: TodoserviceService,
    private router1: Router
  ) {
    ms.getAllTask();
  }
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  taskForm: any = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    description: ['', [Validators.required, Validators.minLength(50)]],
    priority: ['', [Validators.required]],
    createdDateTime: [this.todaydates],
    imgUrl: [''],
    dueDateTime: ['', [Validators.required, this.getdataValidate]],
    isCompleted: [false],
    isArchive: [false],
    updatedTask: [''],
  });

  ngOnInit() {
    this.ms.getAllTask();
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
  var1: string = '';
  title1: any;
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
  onSubmit() {
    this.taskForm.value.updatedTask = this.dateTime;
    this.var1 = this.taskForm.value.title;
    this.title1 = this.var1.replace(/\s/g, '');
    this.taskForm.value.title = this.title1;
    this.taskForm.value.imgUrl = this.url;
    this.ms.addTask(this.taskForm.value).subscribe(
      (data) => {
        console.log(data);
        this.router1.navigateByUrl('header');
        alert('Task added successfully');
        location.reload();
      },
      (error) => {
        alert('This task already exists');
        console.log(error);
      }
    );
  }
}
