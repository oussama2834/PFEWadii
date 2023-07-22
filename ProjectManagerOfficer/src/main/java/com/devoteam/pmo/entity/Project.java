package com.devoteam.pmo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity

public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;
    private String projectName;
    @Column(columnDefinition = "LONGTEXT")
    private String projectDescription;
    private String sponsor;
    private String domain;
    private String nature;
    @Temporal(TemporalType.DATE)

    private Date startDate;
    @Temporal(TemporalType.DATE)

    private Date endDate;
  @JsonManagedReference
    @OneToMany(mappedBy = "project", cascade = CascadeType.MERGE)
    private List<Step> steps;


    @ManyToOne( cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private User user;


}



