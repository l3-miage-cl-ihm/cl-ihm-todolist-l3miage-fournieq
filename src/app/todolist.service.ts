import { Injectable } from '@angular/core';
import { BehaviorSubject, reduce } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface TodoItem {
  readonly label: string;
  readonly isDone: boolean;
  readonly id: number;
}

export interface TodoList {
  readonly label: string;
  readonly items: readonly TodoItem[];
}

let idItem = 0;

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  private subj = new BehaviorSubject<TodoList>({label: 'L3 MIAGE', items: [] });
  readonly observable = this.subj.asObservable();

  constructor( ) {
  }





  create(...labels: readonly string[]): this {
    const L: TodoList = this.subj.value;
    this.subj.next( {
      ...L,
      items: [
        ...L.items,
        ...labels.filter( l => l !== '').map(
            label => ({label, isDone: false, id: idItem++})
          )
      ]
    } );

    return this;
  }

  delete(...items: readonly TodoItem[]): this {
    const L = this.subj.value;
    this.subj.next( {
      ...L,
      items: L.items.filter(item => items.indexOf(item) === -1 )
    } );
    return this;
  }

  update(data: Partial<TodoItem>, ...items: readonly TodoItem[]): this {
    if(data.label !== "") {
      const L = this.subj.value;
      this.subj.next( {
        ...L,
        items: L.items.map( item => items.indexOf(item) >= 0 ? {...item, ...data} : item )
      } );
    } else {
      this.delete(...items);
    }
    return this;
  }

  compteNonFini(l: readonly TodoItem[]): number {
    return l.filter(l => !l.isDone).length
  }

  compte(l: readonly TodoItem[]): number {
    return l.length
  }

  listeDone(l: readonly TodoItem[]){
    return l.filter(l => l.isDone)
  }

  allDone(l: readonly TodoItem[]):boolean{
    let bool:boolean = true
    l.map(x => {
      if (!x.isDone){
        bool = false;
      }
    })
    return bool

  }

  importe(tdl:TodoList){
    this.subj.next(tdl);
  }


}
