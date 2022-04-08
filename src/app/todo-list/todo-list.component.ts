import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AppComponent } from './../app.component';
import { Component, OnInit, ChangeDetectionStrategy, Inject, Input, EventEmitter, Output} from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem, TodoList, TodolistService } from '../todolist.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

type fitre = (t:TodoItem) => boolean

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  @Input() compareListe:boolean = false;
  @Input() inputAuth!:string|null;
  @Input() data!:TodoList;
  readonly todolistObs : Observable<TodoList>;
  //public tdl : TodoList = {label : "", items : []};
  readonly all:fitre = (it) => true
  readonly completed:fitre = (it) => it.isDone
  readonly actif:fitre = (it) => !it.isDone

  @Input() tdlActive!:TodoList;

  f:fitre= this.all;



  constructor(private tds: TodolistService, public afs: AngularFirestore) {
    this.todolistObs = tds.observable;



    //this.todolistObs.subscribe(l => this.tdl = l)

  }

  async addFirestore(user: string | null, todoList: TodoList) {
    console.log("nom: " + user)
    if (user != null)
      await this.afs.collection('listeItems').doc(user).set(todoList)
  }

  ngOnInit(): void {
  }

  trackByItem(index: number, item:TodoItem) {
    return item.id
  }

  create(...label: readonly string[]): void {
    this.tds.create(...label)
  }

  delete(...label: readonly TodoItem[]): void {
    this.tds.delete(...label);
  }

  update(data: Partial<TodoItem>, ...items: readonly TodoItem[]){
    this.tds.update(data, ...items)
  }

  compteNonFini(l: readonly TodoItem[]): number {
    return this.tds.compteNonFini(l)
  }

  compte(l: readonly TodoItem[]): number {
    return this.tds.compte(l)
  }

  supprimeCoche(items: readonly TodoItem[]):void{

    this.tds.delete(...items)
    /*
    this.tdl.items.map(item => {
        if (item.isDone) {
          this.delete(item)
        }
      }
    )*/
  }

  marqueAll(items: readonly TodoItem[]):void{

    this.tds.update({isDone:true}, ...items)
   /* this.tdl.items.map(item => {
      item.isDone = true
    })*/
  }

  demarqueAll(items: readonly TodoItem[]):void{

    this.tds.update({isDone:false}, ...items)

  }

  listeDone(l: readonly TodoItem[]){
    return this.tds.listeDone(l);
  }

  allDone(l: readonly TodoItem[]):boolean{
    return this.tds.allDone(l)
  }
}

