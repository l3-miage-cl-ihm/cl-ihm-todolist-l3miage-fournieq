
import { TodoItem, TodoList } from './../todolist.service';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {

  @Output() delete = new EventEmitter<TodoItem>();
  @Output() update = new EventEmitter<TodoItem>();
  @Input () data!:TodoItem;
  constructor() {

  }



  ngOnInit(): void {
  }

  toggle(t:Partial<TodoItem>):void {

    //this.data.isDone = !this.data.isDone;
    this.update.emit({...this.data,...t});
  }

  supprime():void{
    this.delete.emit(this.data);
  }











}
