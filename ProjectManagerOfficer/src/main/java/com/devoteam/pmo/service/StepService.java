package com.devoteam.pmo.service;

import com.devoteam.pmo.entity.Step;
import com.devoteam.pmo.repository.StepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StepService {


    @Autowired
    private StepRepository stepRepository;


    public List<Step> findAllSteps() {
        return stepRepository.findAll();
    }
    public void deleteStep(Long id){
        stepRepository.deleteById(id);
    }
}
