import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Step } from '../_model/step.model';

@Injectable({
  providedIn: 'root'
})


  export class StepService {

    private baseUrl = 'http://localhost:8086';

    constructor(private http: HttpClient) { }

    addStep(projectId: number, step: any): Observable<any> {
      const url = `${this.baseUrl}/${projectId}/steps`;
      return this.http.post(url, step);
    }


    getAllSteps(): Observable<Step[]> {
      return this.http.get<Step[]>(`${this.baseUrl}/steps`);
    }
  deletestep(id:number) {
    return this.http.delete(this.baseUrl+"/step/"+id)
  }
}
