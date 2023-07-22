package com.devoteam.pmo.service;

import com.devoteam.pmo.entity.Project;
import com.devoteam.pmo.entity.Step;
import com.devoteam.pmo.entity.User;
import com.devoteam.pmo.repository.ProjectRepository;
import com.devoteam.pmo.repository.StepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private StepRepository stepRepository;

    public Project addNewProject (Project project){
       return projectRepository.save(project);
    }


    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }


    public void deleteProject(Long id){
        projectRepository.deleteById(id);
    }


    public Step addStep(Long projectId, Step step) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with id " + projectId));

        step.setProject(project);
        List<Step> steps = new ArrayList<>();
        steps.add(step);
         project.setSteps(steps);
        // Save the new step first
        Step savedStep = stepRepository.save(step);

        // If the project's start date is null or after the step's start date,
        // update the project's start date to the step's start date
        if (project.getStartDate() == null || project.getStartDate().after(savedStep.getStartDate())) {
            project.setStartDate(savedStep.getStartDate());
        }

        // If the project's end date is null or before the step's end date,
        // update the project's end date to the step's end date
        if (project.getEndDate() == null || project.getEndDate().before(savedStep.getEndDate())) {
            project.setEndDate(savedStep.getEndDate());
        }

        // Save the updated project
        projectRepository.save(project);

        return savedStep;
    }



    public Project getProjectDetail(Long projectId) {
        return projectRepository.findByProjectId(projectId);
    }



}
