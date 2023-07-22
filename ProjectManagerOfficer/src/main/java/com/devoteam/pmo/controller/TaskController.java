package com.devoteam.pmo.controller;

import com.devoteam.pmo.Enum.ETaskProgress;
import com.devoteam.pmo.entity.Task;
import com.devoteam.pmo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class TaskController {

    @Autowired
    private TaskService taskService;
    @GetMapping("/prgressType")
    public List<String> getTypeProgress() {
        return Arrays.stream(ETaskProgress.values())
                .map(ETaskProgress::name)
                .collect(Collectors.toList());}
    @GetMapping("/tasks")
    public List <Task> getTasks(){
         return taskService.getAllTasks();
    }
    @PostMapping("/{stepId}")
    public Task addTask(@PathVariable Long stepId, @RequestBody Task task) {
        return taskService.addTask(stepId, task);
    }

    @PutMapping("/editTask/{taskId}")
    public Task EditTask(@PathVariable Long taskId, @RequestBody String taskprogress) {
        return taskService.EditTask(taskId,taskprogress);
    }

    @PutMapping("/{taskId}/assign/{userName}")
    public Task assignTaskToUser(@PathVariable Long taskId, @PathVariable String userName) {
        return taskService.assignTaskToUser(taskId, userName);
    }

    @DeleteMapping("/task/{id}")
    public void deleteTask(@PathVariable Long id){
        taskService.deleteTask(id);
    }
}
