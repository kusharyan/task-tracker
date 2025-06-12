import { Component, computed, inject, signal } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../task-model/task.model';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  tasks$: Observable<Task[]>;
  filteredTasks$: Observable<Task[]>;
  currentUserEmail: string | undefined;

  constructor(private taskService: TasksService) {
    this.tasks$ = this.taskService.tasks$;
    this.currentUserEmail = this.taskService.getLocalUser();
    this.filteredTasks$ = this.tasks$.pipe(
      map((tasks) =>
        tasks.filter((task) => task.userMail === this.currentUserEmail)
      )
    );
  }

  filter: 'all' | 'pending' | 'completed' = 'all';

  setFilter(value: 'all' | 'pending' | 'completed') {
    this.filter = value;
  }

  filterTasks(tasks: Task[]): Task[] {
    if (this.filter === 'all') return tasks;
    return tasks.filter((t) =>
      this.filter === 'completed' ? t.completed : !t.completed
    );
  }
}
