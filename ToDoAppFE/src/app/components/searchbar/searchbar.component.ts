import { Component, EventEmitter, Output } from '@angular/core';
import { TASK } from 'src/model/task';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent  {
  selected = '';
  selected2:any;
  searchedTitle:string =""

  taskArray:TASK[]|undefined

 @Output()
 sendToContainer:EventEmitter<any>=new EventEmitter();
 searchinput(){
  this.sendToContainer.emit(this.searchedTitle);
 }
 @Output()
 sendToContainer1:EventEmitter<any>=new EventEmitter();
 searchinput1(){
  this.sendToContainer1.emit(this.selected);
 }
 @Output()
 sendToContainer2:EventEmitter<any>=new EventEmitter();
 searchinput2()
 {
   this.sendToContainer2.emit(this.selected2);
 }

 cleardata(){
  this.searchedTitle="";
  this.selected = "";
  this.selected2=
  this.sendToContainer1.emit(this.selected);
  this.sendToContainer.emit(this.searchedTitle);
  this.sendToContainer2.emit(this.selected2);
  }
}
