import { Component, Input } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { RTask } from '../../task-model/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-item',
  imports: [FormsModule, CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  @Input() task!: RTask;
  isEditing = false;
  editedTaskName = '';
  editedDescription = '';

  private unsubscribe!: Subscription;

  constructor(private taskService: TasksService) {}

  toggleComplete() {
    this.unsubscribe = this.taskService.toggleTask(this.task._id!, !this.task.completed,this.task).subscribe({
      next: (data)=> {this.taskService.requestFetch()},
      error: (err)=> console.log(err)
    });
  }

  deleteTsk() {
    this.unsubscribe = this.taskService.deleteTask(this.task._id!).subscribe({
      next: (data) => {
        this.taskService.requestFetch()
      },
      error: (err)=> console.log(err)
    });
  }

  startEdit() {
    if (this.task.completed) return;
    this.isEditing = true;
    this.editedTaskName = this.task.name;
    this.editedDescription = this.task.description;
  }

  saveEdit() {
    this.unsubscribe = this.taskService.updateTask(this.task._id!, {
      name: this.editedTaskName,
      description: this.editedDescription,
      completed: this.task.completed,
      userId: this.task.userId,
      _id: this.task._id,
    }).subscribe({
      next: (data) => {
        this.taskService.requestFetch(),
        console.log(data)
      },
      error: (err) => console.log(err)
    });
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  ngOnDestroy(){
    if(this.unsubscribe){
      this.unsubscribe.unsubscribe();
    }
  }
}
