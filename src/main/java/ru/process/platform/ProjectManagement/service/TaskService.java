package ru.process.platform.ProjectManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.process.platform.ProjectManagement.dto.request.TaskRequestDto;
import ru.process.platform.ProjectManagement.dto.response.TaskDataDto;
import ru.process.platform.ProjectManagement.entity.Comment;
import ru.process.platform.ProjectManagement.entity.UserProject;
import ru.process.platform.ProjectManagement.entity.project.Project;
import ru.process.platform.ProjectManagement.entity.task.Task;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.repository.CommentRepository;
import ru.process.platform.ProjectManagement.repository.ProjectRepository;
import ru.process.platform.ProjectManagement.repository.TaskRepository;
import ru.process.platform.ProjectManagement.repository.UserProject.UserProjectRepository;
import ru.process.platform.ProjectManagement.repository.UserRepository;
import ru.process.platform.ProjectManagement.service.predicates.SpecificationService;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final UserProjectRepository userProjectRepository;
    private final SpecificationService specificationService;
    private final CommentRepository commentRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository, UserRepository userRepository,
                       UserProjectRepository userProjectRepository, SpecificationService specificationService, CommentRepository commentRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.userProjectRepository = userProjectRepository;
        this.specificationService = specificationService;
        this.commentRepository = commentRepository;
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
        task.setCreationDate(new Date());
        task.setDateEnd(taskRequestDto.getDateEnd());
        task.setTime(taskRequestDto.getTime());
        task.setPrimaryProject(findProject);
        task.setAssignee(assigneeUser);
        task.setReporter(reporterUser);

        return taskRepository.save(task);
    }

    //todo передалть на specification
    public TaskDataDto getProjectTaskData(Integer taskId) {
        TaskDataDto taskDataDto = new TaskDataDto();

        if (taskId != null) {
            Task task = taskRepository.findOne(taskId);
            taskDataDto.setTask(task);
            int projectId = task.getPrimaryProject().getId();
            List<User> userList = userProjectRepository.findByPrimaryProjectId(projectId)
                    .stream()
                    .map(UserProject::getPrimaryUser)
                    .collect(Collectors.toList());
            taskDataDto.setUsers(userList);
            Project project = projectRepository.findOne(projectId);
            taskDataDto.setProject(project);
            List<Comment> comments = commentRepository.findByPrimaryTaskId(task.getId());
            if(comments != null){
                taskDataDto.setComments(comments);
            }
        }


        return taskDataDto;

    }

    //todo передалть на specification
    public Page<Task> getTaskList(Integer userId, Pageable pageable) {
//        Specification<Task> allTaskSpecification = specificationService.getAllTaskSpecification(userId);

        return taskRepository.findAll(pageable);

    }
}