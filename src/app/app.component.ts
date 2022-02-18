import { TodolistService, TodoItem } from './todolist.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'l3m-tpX-todolist-angular-y2022';
  todoList: TodolistService;
  constructor(public todoListS: TodolistService){
    this.todoList=todoListS;
  }


}
