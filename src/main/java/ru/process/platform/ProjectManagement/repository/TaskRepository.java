package ru.process.platform.ProjectManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import ru.process.platform.ProjectManagement.entity.task.Task;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer>, JpaSpecificationExecutor<Task> {

    List<Task> findByPrimaryProjectId(Integer userId);
}
