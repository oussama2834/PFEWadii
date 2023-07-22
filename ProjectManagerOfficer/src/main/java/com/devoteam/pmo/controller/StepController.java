package com.devoteam.pmo.controller;

import com.devoteam.pmo.entity.Step;
import com.devoteam.pmo.service.StepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StepController {


    @Autowired
    private StepService stepService;


    @GetMapping("/steps")
    public ResponseEntity<List<Step>> getAllSteps(){
        List<Step> steps = stepService.findAllSteps();
        return ResponseEntity.ok(steps);
    }
    @DeleteMapping("/step/{id}")
  public void deleteStep(@PathVariable Long id){
        stepService.deleteStep(id);
   }
}
