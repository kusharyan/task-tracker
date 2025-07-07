import {
  Component,
  OnInit,
} from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { RTask } from '../../task-model/task.model';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit{
  tasks: RTask[] = [];
  // @Input() tasks: RTask[] = [];
  filter: 'all' | 'completed' | 'pending' = 'all';

  constructor(
    private taskService: TasksService,
  ) {}


  ngOnInit(): void {
    this.fetchTasks();
    this.taskService.fetchRequest$.subscribe(() => {
    this.fetchTasks();
  });
  }

  fetchTasks(): void {
    this.taskService.loadTasks().subscribe((data) => {
      this.tasks = [...data];
    });
  }

  setFilter(value: 'all' | 'completed' | 'pending' = 'all') {
    this.filter = value;
  }

  getFilteredTasks() {
    switch (this.filter) {
      case 'completed':
        return this.tasks.filter((task) => task.completed);
      case 'pending':
        return this.tasks.filter((task) => !task.completed);
      default:
        return this.tasks;
    }
  }
}
