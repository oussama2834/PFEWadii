package com.devoteam.pmo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
@Data
@Entity
public class Step {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    private Date startDate;

    private Date endDate;
   @JsonBackReference
    @ManyToOne
    @JoinColumn(name="projectId", nullable=false)
    private Project project;


   @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "step")
    private List<Task> tasks;

}