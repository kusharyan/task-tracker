import { Component } from '@angular/core';
import { AddTasksComponent } from '../add-tasks/add-tasks.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-layout',
  imports: [AddTasksComponent, TaskListComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  // tasks: RTask[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private taskService: TasksService
  ) {}

  // ngDoCheck() {
  //   this.fetchTasks();
  // }

  logout() {
    this.authService.logout();
    localStorage.removeItem('user');
    this.router.navigate(['/login-form']);
  }

  // fetchTasks(): void {
  //   this.taskService.loadTasks().subscribe((data) => {
  //     this.tasks = [...data];
  //   });
  // }
}
