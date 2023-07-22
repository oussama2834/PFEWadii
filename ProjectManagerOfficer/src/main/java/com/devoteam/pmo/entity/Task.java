package com.devoteam.pmo.entity;

import com.devoteam.pmo.Enum.ETaskProgress;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Data
@Getter
@Setter
@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;


    private String taskDescription;

    @Temporal(TemporalType.DATE)
    private Date dueDate;

   @Enumerated(EnumType.STRING)
    private ETaskProgress taskProgress;

    private int ponderation;

    private int ponderationProgress;
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "step_id")
    private Step step;



    @ManyToOne

    @JoinColumn(name = "user_name")
    private User user;
}