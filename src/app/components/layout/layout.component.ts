import { Component } from '@angular/core';
import { AddTasksComponent } from '../add-tasks/add-tasks.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [AddTasksComponent, TaskListComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login-form']);
  }

}
