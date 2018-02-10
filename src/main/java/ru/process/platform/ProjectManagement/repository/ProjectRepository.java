package ru.process.platform.ProjectManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.process.platform.ProjectManagement.entity.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Integer>{

}
