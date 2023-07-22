package com.devoteam.pmo.controller;

import com.devoteam.pmo.entity.Project;
import com.devoteam.pmo.entity.Step;
import com.devoteam.pmo.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin

public class ProjectController {

    @Autowired
    private ProjectService projectService;


    @PostMapping({"/addNewProject"})
    public Project addNewProject(@RequestBody Project project) {
        return projectService.addNewProject(project);
    }

    @GetMapping("/projects")
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/projects/{projectId}")
    public Project getProjectDetail(@PathVariable Long projectId) {
        return projectService.getProjectDetail(projectId);
    }
    @DeleteMapping("/project/{id}")
    public void deleteProject(@PathVariable Long id){
        projectService.deleteProject(id);
    }

    @PostMapping("/{projectId}/steps")
    public Step addStep(@PathVariable Long projectId, @RequestBody Step step) {
        return projectService.addStep(projectId, step);
    }

}
