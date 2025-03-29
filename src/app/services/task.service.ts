import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTask } from '../classes/create-task';
import { Constants } from '../classes/constants';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskPath: string = Constants.rootURL + "tasks"

  constructor(
    private http: HttpClient,
  ) {}

  list(): Observable<any> {
    return this.http.get(this.taskPath)
  }

  create(body: CreateTask): Observable<any> {
    return this.http.post(this.taskPath, body.serialize())
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.taskPath, {params:{id}})
  }
}
