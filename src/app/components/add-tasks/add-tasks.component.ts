import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-add-tasks',
  imports: [FormsModule],
  templateUrl: './add-tasks.component.html',
  styleUrl: './add-tasks.component.css'
})
export class AddTasksComponent {
   taskName = '';
  taskDescription = '';

  constructor(private taskService: TasksService) {}

  addTask() {
    if (this.taskName.trim()) {
      this.taskService.addTask(this.taskName, this.taskDescription);
      this.taskName = '';
      this.taskDescription = '';
    }
  }
}
