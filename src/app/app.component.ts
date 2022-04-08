import { TodolistService, TodoItem, TodoList } from './todolist.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import  firebase from 'firebase/compat/app';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  title = 'l3m-tpX-todolist-angular-y2022';
  todoList: TodolistService;
  constructor(public todoListS: TodolistService, public auth: AngularFireAuth, public afs: AngularFirestore){
    this.todoList=todoListS;
  }

  async connectionFireBase(P:any) {

    let a:firebase.User|null = await this.auth.currentUser
    let matodo:TodoList | undefined
    if (a !== null && a.displayName !== null) {

      this.afs.collection<TodoList>("listeItems").doc(a.displayName).get().subscribe( x =>{

        if (x.data() !== undefined){
          matodo = x.data();
          if (matodo !== undefined) {
            this.todoList.importe(matodo)
            console.log(matodo)
          }
        }
    });

    }
  }



  compareListe():boolean{

    return true
  }


  async login() {
   var P = await  this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.connectionFireBase(P);
  }
  logout() {
    this.auth.signOut();
  }

}
