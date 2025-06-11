import { Component, Input } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../task-model/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { retry } from 'rxjs';

@Component({
  selector: 'app-task-item',
  imports: [FormsModule, CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() task!: Task;
  editing = false;
  editedName = '';
  editedDesc = '';

  constructor(private taskService: TasksService) {}

  toggleComplete() {
    this.taskService.toggleTask(this.task.id);
  }

  delete() {
    this.taskService.deleteTask(this.task.id);
  }

  startEdit() {
    if(this.task.completed) return;
    this.editing = true;
    this.editedName = this.task.name;
    this.editedDesc = this.task.description;
  }

  saveEdit() {
    this.taskService.updateTask(this.task.id, this.editedName, this.editedDesc);
    this.editing = false;
  }

  cancelEdit() {
    this.editing = false;
  }
}
