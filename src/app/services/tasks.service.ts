import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Task } from '../task-model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  // private tasks = new BehaviorSubject<Task[]>([]);
  // tasks$ = this.tasks.asObservable();

  // private currentId = 0;

  // addTask(name: string, description: string) {
  //   const newTask: Task = {
  //     id: this.currentId++,
  //     name,
  //     description,
  //     completed: false
  //   };
  //   this.tasks.next([...this.tasks.value, newTask]);
  // }

  // deleteTask(id: number) {
  //   this.tasks.next(this.tasks.value.filter(t => t.id !== id));
  // }

  // toggleTask(id: number) {
  //   this.tasks.next(
  //     this.tasks.value.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
  //   );
  // }

  // updateTask(id: number, name: string, description: string) {
  //   this.tasks.next(
  //     this.tasks.value.map(t => t.id === id ? { ...t, name, description } : t)
  //   );
  // }

  private tasks = new BehaviorSubject<Task[]>(this.loadTasksFromStorage());
  tasks$ = this.tasks.asObservable();

  private currentId = this.getNextId();

  constructor() {
    this.tasks.subscribe((tasks) => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }

  addTask(name: string, description: string) {
    const newTask: Task = {
      id: this.currentId++,
      name,
      description,
      completed: false,
    };
    this.tasks.next([...this.tasks.value, newTask]);
  }

  deleteTask(id: number) {
    this.tasks.next(this.tasks.value.filter((t) => t.id !== id));
  }

  toggleTask(id: number) {
    this.tasks.next(
      this.tasks.value.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  updateTask(id: number, name: string, description: string) {
    this.tasks.next(
      this.tasks.value.map((t) =>
        t.id === id ? { ...t, name, description } : t
      )
    );
  }

  private loadTasksFromStorage(): Task[] {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
  }

  private getNextId(): number {
    const tasks = this.loadTasksFromStorage();
    return tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 0;
  }
}
