import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../_model/task.model';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  addTask(stepId: number, task: Task): Observable<Task> {
    return this.http.post<Task>(`http://localhost:8086/${stepId}`, task);
  }
  getTasks() {
    return this.http.get<Task[]>(`http://localhost:8086/tasks`);
  }
  EditTask(taskId: number, progressType: string): Observable<Task> {
    return this.http.put<Task>(`http://localhost:8086/editTask/${taskId}`
      , progressType);
  }
 getTaskProgressType(){
  return this.http.get<string[]>("http://localhost:8086/prgressType");
 }
  assignTaskToUser(taskId: number, userName: string): Observable<Task> {
    return this.http.put<Task>(`http://localhost:8086/${taskId}/assign/${userName}`, {});
  }
  deletetask(id:number) {
    return this.http.delete("http://localhost:8086/task/"+id)
  }
}
