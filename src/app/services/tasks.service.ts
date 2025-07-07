import { Injectable } from '@angular/core';
import { RTask, Task } from '../task-model/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiUrl = 'http://localhost:3000/api/tasks';

  private fetchRequest = new Subject<void>();
  fetchRequest$ = this.fetchRequest.asObservable();

  requestFetch() {
    this.fetchRequest.next();
  }

  constructor(private http: HttpClient) {}
  
  loadTasks(): Observable<RTask[]> {
    return this.http.get<RTask[]>(this.apiUrl);
  }

  addTask(task: Task): Observable<RTask> {
    return this.http.post<RTask>(this.apiUrl, task);
  }

  updateTask(_id: string, task: RTask): Observable<RTask> {
    return this.http.put<RTask>(`${this.apiUrl}/${_id}`, task);
  }

  deleteTask(_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${_id}`);
  }

  toggleTask(_id: string, currentStatus: boolean, task: RTask){
    return this.updateTask(_id, {
      completed: currentStatus,
      userId: task.userId,
      name: task.name,
      description: task.description
    });
  }
}