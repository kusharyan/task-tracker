import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Task } from '../task-model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasks.asObservable();

  private currentId = 0;

  addTask(name: string, description: string) {
    const newTask: Task = {
      id: this.currentId++,
      name,
      description,
      completed: false
    };
    this.tasks.next([...this.tasks.value, newTask]);
  }

  deleteTask(id: number) {
    this.tasks.next(this.tasks.value.filter(t => t.id !== id));
  }

  toggleTask(id: number) {
    this.tasks.next(
      this.tasks.value.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  updateTask(id: number, name: string, description: string) {
    this.tasks.next(
      this.tasks.value.map(t => t.id === id ? { ...t, name, description } : t)
    );
  }


  // tasks = signal<Task[]>(this.loadTasks());

  // private loadTasks(): Task[] {
  //   const saved = localStorage.getItem(TASKS_STORAGE_KEY);
  //   return saved ? JSON.parse(saved) : [];
  // }

  // private saveTasks() {
  //   localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(this.tasks()));
  // }

  // addTask(task: Task) {
  //   this.tasks.update(tasks => {
  //     const updated = [...tasks, task];
  //     localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updated));
  //     return updated;
  //   });
  // }

  // updateTask(updatedTask: Task) {
  //   this.tasks.update(tasks => {
  //     const updated = tasks.map(task =>
  //       task.id === updatedTask.id ? updatedTask : task
  //     );
  //     localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updated));
  //     return updated;
  //   });
  // }

  // deleteTask(id: number) {
  //   this.tasks.update(tasks => {
  //     const updated = tasks.filter(task => task.id !== id);
  //     localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updated));
  //     return updated;
  //   });
  // }
}
