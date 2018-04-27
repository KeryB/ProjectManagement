package ru.process.platform.ProjectManagement.ws.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.process.platform.ProjectManagement.dto.filter.ProjectFilterRequestDto;
import ru.process.platform.ProjectManagement.dto.response.ProjectDataDto;
import ru.process.platform.ProjectManagement.dto.response.UserProjectPermissionDto;
import ru.process.platform.ProjectManagement.entity.RestResponse;
import ru.process.platform.ProjectManagement.entity.jwt.Token;
import ru.process.platform.ProjectManagement.entity.project.Project;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.service.ProjectService;
import ru.process.platform.ProjectManagement.service.UserService;
import ru.process.platform.ProjectManagement.service.security.JwtService;
import ru.process.platform.ProjectManagement.utils.error.ErrorMessage;
import ru.process.platform.ProjectManagement.utils.error.ErrorStatus;
import ru.process.platform.ProjectManagement.ws.config.MappedUser;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping(value = "/api/project",consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class ProjectController {

    private UserService userService;

    private ProjectService projectService;

    private JwtService jwtService;

    @Value("${jwt.header}")
    private String tokenHeader;

    @Autowired
    public ProjectController(UserService userService, ProjectService projectService, JwtService jwtService) {
        this.userService = userService;
        this.projectService = projectService;
        this.jwtService = jwtService;
    }

    //todo преобразовать токен в юзера
    @RequestMapping(value = "/fetchProjectData", method = RequestMethod.POST)
    public RestResponse fetchProjectData(HttpServletRequest request,
                                         @RequestBody ProjectFilterRequestDto filterRequestDto,
                                         @MappedUser User user) {
        UserProjectPermissionDto projectPermission = projectService.getProjectPermission(user.getId(), filterRequestDto);
        return RestResponse.ok(projectPermission);
    }

    @RequestMapping(value = "/saveProject", method = RequestMethod.POST)
    public RestResponse saveProject(HttpServletRequest request, @RequestBody Project project, @MappedUser User user) {
        return RestResponse.ok(projectService.saveProject(project, user));
    }

    @RequestMapping(value = "/fetchProjectsProfile", method = RequestMethod.POST)
    public RestResponse fetchProjectsProfile(HttpServletRequest request, @RequestBody ProjectFilterRequestDto filterRequestDto) {
        String header = request.getHeader(tokenHeader);
        Token token = jwtService.getClaimsFromToken(header);

        if (token == null) {
            return RestResponse.error(ErrorStatus.INVALID_TOKEN_HEADER, ErrorMessage.INVALID_TOKEN_HEADER);
        }

        List<Project> projects = projectService.findProjectsProfile(filterRequestDto.getUserId(), filterRequestDto);
        return RestResponse.ok(projects);
    }

    @RequestMapping(value = "/fetchProjects", method = RequestMethod.POST)
    public RestResponse fetchProjects(HttpServletRequest request, @MappedUser User user) {
        List<Project> projects = projectService.findProjectsByUserId(user.getId());
        return RestResponse.ok(projects);
    }

    @RequestMapping(value = "/fetchActualProjectData", method = RequestMethod.POST)
    public RestResponse fetchActualProjectData (HttpServletRequest request, @RequestBody Project project) {
        if(project.getId() == null) {
            return RestResponse.error(ErrorStatus.INVALID_PROJECT_ID,ErrorMessage.INVALID_PROJECT_ID);
        }

        project = projectService.findOne(project.getId());
        if(project == null) {
            return RestResponse.error(ErrorStatus.INVALID_PROJECT_ID,ErrorMessage.INVALID_PROJECT_ID);
        }

        ProjectDataDto actualProjectData = projectService.getActualProjectData(project);
        return RestResponse.ok(actualProjectData);
    }

}

