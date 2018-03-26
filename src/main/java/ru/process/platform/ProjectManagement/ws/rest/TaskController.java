package ru.process.platform.ProjectManagement.ws.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.process.platform.ProjectManagement.dto.request.TaskRequestDto;
import ru.process.platform.ProjectManagement.dto.response.TaskDataDto;
import ru.process.platform.ProjectManagement.entity.RestResponse;
import ru.process.platform.ProjectManagement.entity.jwt.Token;
import ru.process.platform.ProjectManagement.entity.task.Task;
import ru.process.platform.ProjectManagement.service.ProjectService;
import ru.process.platform.ProjectManagement.service.TaskService;
import ru.process.platform.ProjectManagement.service.UserService;
import ru.process.platform.ProjectManagement.service.security.JwtService;
import ru.process.platform.ProjectManagement.utils.error.ErrorMessage;
import ru.process.platform.ProjectManagement.utils.error.ErrorStatus;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "/api/task",consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class TaskController {

    private UserService userService;

    private ProjectService projectService;

    private TaskService taskService;

    private JwtService jwtService;

    @Value("${jwt.header}")
    private String tokenHeader;

    @Autowired
    public TaskController(UserService userService, ProjectService projectService, JwtService jwtService, TaskService taskService) {
        this.userService = userService;
        this.projectService = projectService;
        this.jwtService = jwtService;
        this.taskService = taskService;
    }

    @PostMapping(value = "/saveTask")
    public RestResponse saveTask(HttpServletRequest request, @RequestBody TaskRequestDto taskRequestDto){
        String header = request.getHeader(tokenHeader);
        Token token = jwtService.getClaimsFromToken(header);

        if (token == null) {
            return RestResponse.error(ErrorStatus.INVALID_TOKEN_HEADER, ErrorMessage.INVALID_TOKEN_HEADER);
        }

        Task task = taskService.createTask(taskRequestDto, token.getId());
        return RestResponse.ok(task);
    }

    @PostMapping(value = "/fetchTaskData")
    public RestResponse fetchTaskData(HttpServletRequest request, @RequestBody Task task){
        String header = request.getHeader(tokenHeader);
        Token token = jwtService.getClaimsFromToken(header);

        if (token == null) {
            return RestResponse.error(ErrorStatus.INVALID_TOKEN_HEADER, ErrorMessage.INVALID_TOKEN_HEADER);
        }

        TaskDataDto projectTaskData = taskService.getProjectTaskData(task.getId());
        return RestResponse.ok(projectTaskData);
    }

    @PostMapping(value = "/fetchTaskList")
    public RestResponse fetchTaskList(HttpServletRequest request, Pageable pageable){
        String header = request.getHeader(tokenHeader);
        Token token = jwtService.getClaimsFromToken(header);

        if (token == null) {
            return RestResponse.error(ErrorStatus.INVALID_TOKEN_HEADER, ErrorMessage.INVALID_TOKEN_HEADER);
        }

        Page<Task> taskList = taskService.getTaskList(token.getId(), pageable);
        return RestResponse.ok(taskList);
    }

    @PostMapping(value = "/addComment")
    public RestResponse addComment(HttpServletRequest request, @RequestBody String kek){
        String header = request.getHeader(tokenHeader);
        Token token = jwtService.getClaimsFromToken(header);

        if (token == null) {
            return RestResponse.error(ErrorStatus.INVALID_TOKEN_HEADER, ErrorMessage.INVALID_TOKEN_HEADER);
        }

        return RestResponse.ok(true);
    }

}
