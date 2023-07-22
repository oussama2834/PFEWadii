import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../_model/project.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  PATH_OF_API='http://localhost:8086';

  constructor(private httpclient: HttpClient) { }


  public addProject(project: Project){
    return this.httpclient.post<Project>("http://localhost:8086/addNewProject", project);
  }


  public getAllProjects(): Observable<Project[]>{
    return this.httpclient.get<Project[]>(`${this.PATH_OF_API}/projects`);

  }
  deleteproject(id:number) {
    return this.httpclient.delete("http://localhost:8086/project/"+id)
  }



  getProjectDetail(projectId: number): Observable<Project> {
    const url = `${this. PATH_OF_API}/projects/${projectId}`;
    return this.httpclient.get<Project>(url);
  }


}
