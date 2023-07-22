package com.devoteam.pmo.service;

import com.devoteam.pmo.Enum.ETaskProgress;
import com.devoteam.pmo.entity.Step;
import com.devoteam.pmo.entity.Task;
import com.devoteam.pmo.entity.User;
import com.devoteam.pmo.repository.StepRepository;
import com.devoteam.pmo.repository.TaskRepository;
import com.devoteam.pmo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
@Autowired

private TaskRepository taskRepository;
    @Autowired

    private UserRepository userRepository ;
    @Autowired

    private StepRepository stepRepository;




    public Task addTask(Long stepId, Task task) {
        Step step = stepRepository.findById(stepId).orElseThrow(() -> new IllegalArgumentException("Step not found."));
        task.setTaskProgress(ETaskProgress.TODO);
        task.setPonderation(0);
        task.setPonderationProgress(0);
        task.setStep(step);
        return taskRepository.save(task);
    }
    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }
    public Task EditTask(Long idTask,String progresstype){
        ETaskProgress progress = ETaskProgress.valueOf(progresstype);
         Task task = taskRepository.findById(idTask).orElseThrow(() -> new IllegalArgumentException("Task not found."));
         task.setTaskProgress(progress);
         return taskRepository.save(task);
    }
    public Task assignTaskToUser(Long taskId, String userName) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new IllegalArgumentException("Task not found."));
        User user = userRepository.findById(userName).orElseThrow(() -> new IllegalArgumentException("User not found."));
        task.setUser(user);
        return taskRepository.save(task);
    }
    public void deleteTask(Long taskId){
        stepRepository.deleteById(taskId);
    }
}
