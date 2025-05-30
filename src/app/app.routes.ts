import { Routes } from '@angular/router';
import { AddTasksComponent } from './components/add-tasks/add-tasks.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
  {
    path: 'add-tasks',
    component: AddTasksComponent
  },
  {
    path: 'task-item',
    component: TaskItemComponent
  }, 
  {
    path: 'task-list',
    component: TaskListComponent
  },
  {
    path: '',
    redirectTo: 'add-tasks',
    pathMatch: 'full'
  }
];
