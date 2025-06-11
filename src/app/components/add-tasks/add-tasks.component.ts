import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-tasks',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-tasks.component.html',
  styleUrl: './add-tasks.component.css'
})
export class AddTasksComponent {
  taskForm: FormGroup;
  // taskName = '';
  // taskDescription = '';

  constructor(private taskService: TasksService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    })
  }

  addTask() {
    if (this.taskForm.valid) {
      const { name, description } = this.taskForm.value;
      this.taskService.addTask(name, description);
      this.taskForm.reset();
    }
  }
}