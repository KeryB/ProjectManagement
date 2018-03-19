package ru.process.platform.ProjectManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.process.platform.ProjectManagement.dto.request.TaskRequestDto;
import ru.process.platform.ProjectManagement.dto.response.ProjectTaskDataDto;
import ru.process.platform.ProjectManagement.entity.UserProject;
import ru.process.platform.ProjectManagement.entity.project.Project;
import ru.process.platform.ProjectManagement.entity.task.Task;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.repository.ProjectRepository;
import ru.process.platform.ProjectManagement.repository.TaskRepository;
import ru.process.platform.ProjectManagement.repository.UserProject.UserProjectRepository;
import ru.process.platform.ProjectManagement.repository.UserRepository;
import ru.process.platform.ProjectManagement.service.predicates.SpecificationService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TaskService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final UserProjectRepository userProjectRepository;
    private final SpecificationService specificationService;

    @Autowired
    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository, UserRepository userRepository,
                       UserProjectRepository userProjectRepository, SpecificationService specificationService) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.userProjectRepository = userProjectRepository;
        this.specificationService = specificationService;
    }

    @Transactional
    public Task createTask(TaskRequestDto taskRequestDto, Integer userId) {

        User assigneeUser = userRepository.findOne(taskRequestDto.getUserId());
        User reporterUser = userRepository.findOne(userId);

        Project findProject = projectRepository.findOne(taskRequestDto.getProjectId());

        Task task = new Task();
        task.setTitle(taskRequestDto.getTitle());
        task.setDescription(taskRequestDto.getDescription());
        task.setTaskType(taskRequestDto.getTaskType());
        task.setTaskPriority(taskRequestDto.getTaskPriority());
        task.setStatus(Task.Status.OPEN);
        task.setDateEnd(taskRequestDto.getDateEnd());
        task.setTime(taskRequestDto.getTime());
        task.setPrimaryProject(findProject);
        task.setAssignee(assigneeUser);
        task.setReporter(reporterUser);

        return taskRepository.save(task);
    }

    public Map<Project, ProjectTaskDataDto> getProjectTaskData(Integer userId) {

        Map<Project, ProjectTaskDataDto> projectTaskData = new HashMap<>();

        if (userId != null) {
            List<UserProject> primaryProjectId = userProjectRepository.findByPrimaryUserId(userId);
            primaryProjectId.forEach(userProject -> {
                ProjectTaskDataDto projectTaskDataDto = new ProjectTaskDataDto();
                int projectId = userProject.getPrimaryProject().getId();
                List<UserProject> usersInProject = userProjectRepository.findByPrimaryProjectId(projectId);
                projectTaskDataDto.setUsers(usersInProject);
                List<Task> tasks = taskRepository.findByPrimaryProjectId(projectId);
                projectTaskDataDto.setTasks(tasks);

                projectTaskData.put(userProject.getPrimaryProject(), projectTaskDataDto);
            });
        }

        return projectTaskData;

    }
}