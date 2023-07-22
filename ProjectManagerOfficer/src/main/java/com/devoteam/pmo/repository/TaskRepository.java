package com.devoteam.pmo.repository;

import com.devoteam.pmo.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {}

