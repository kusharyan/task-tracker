import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-tasks',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-tasks.component.html',
  styleUrl: './add-tasks.component.css'
})
export class AddTasksComponent {
  taskForm: FormGroup;
  private addTaskSub!: Subscription;
  
  constructor(private taskService: TasksService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    })
  }

  addTask() {
    if (this.taskForm.valid) {
      const { name, description } = this.taskForm.value;
      console.log(this.taskForm.value);
      this.addTaskSub = this.taskService.addTask({...this.taskForm.value, completed:false}).subscribe({
        next: (data) => {
          this.taskService.requestFetch(),
          console.log(data);
        },
        error: (err)=> console.log(err)
      });
      this.taskForm.reset();
    }
  }

  ngOnDestroy(){
    if(this.addTaskSub){
      this.addTaskSub.unsubscribe();
    }
  }
}