import { Component, OnInit } from '@angular/core';
import { TodoserviceService } from './service/todoservice.service';
import { UserserviceService } from './service/userservice.service';
import { Router } from '@angular/router';
import { USER } from 'src/model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  title = 'ToDoApp';

}
