import { Routes } from '@angular/router';
import { AddTasksComponent } from './components/add-tasks/add-tasks.component';

export const routes: Routes = [
  {
    path: 'add-tasks',
    component: AddTasksComponent,
  },
  {
    path: '',
    redirectTo: 'add-taks',
    pathMatch: 'full'
  }
];