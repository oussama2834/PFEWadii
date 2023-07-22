import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { Project } from 'src/app/_model/project.model';
import { Step } from 'src/app/_model/step.model';
import { Task } from 'src/app/_model/task.model';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project = new Project();
  files!: TreeNode[];
  changedIcon = false;
  tableopened = false;
  currentStep = new Step();
  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProjectDetail(id).subscribe(project => {
      this.project = project;
      console.log("project",this.project)
    });
  }
  changeIcon(step:Step) {
    this.changedIcon = !this.changedIcon
    this.tableopened = !this.tableopened;
    this.currentStep = step
  }
}
