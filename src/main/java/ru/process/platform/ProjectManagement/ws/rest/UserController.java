package ru.process.platform.ProjectManagement.ws.rest;

import javafx.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.process.platform.ProjectManagement.dto.filter.ProjectFilterRequestDto;
import ru.process.platform.ProjectManagement.dto.response.UserProjectPermissionDto;
import ru.process.platform.ProjectManagement.entity.RestResponse;
import ru.process.platform.ProjectManagement.entity.jwt.Token;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.service.ProjectService;
import ru.process.platform.ProjectManagement.service.UserService;
import ru.process.platform.ProjectManagement.service.security.JwtService;
import ru.process.platform.ProjectManagement.utils.StringUtils;
import ru.process.platform.ProjectManagement.utils.error.ErrorMessage;
import ru.process.platform.ProjectManagement.utils.error.ErrorStatus;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping(value = "/api/user", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class UserController {

    private final UserService userService;

    private final JwtService jwtService;

    private final ProjectService projectService;

    @Value("${jwt.header}")
    private String tokenHeader;

    @Value("${project.header}")
    private String projectHeader;

    @Autowired
    public UserController(UserService userService, JwtService jwtService, ProjectService projectService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.projectService = projectService;
    }

    @PostMapping(value = "/fetchUserData")
    public RestResponse fetchUserData(HttpServletRequest request) {
        Token token = jwtService.getClaimsFromToken(request.getHeader(tokenHeader));
        if (token == null) {
            return RestResponse.error(ErrorStatus.INVALID_TOKEN_HEADER, ErrorMessage.INVALID_TOKEN_HEADER);
        }
        UserProjectPermissionDto userProjectPermissionDto = userService.getUserData(token.getId());

        String chosenProjectId = request.getHeader(projectHeader);
        if (chosenProjectId != null && StringUtils.isNumber(chosenProjectId)) {
            Integer projectId = Integer.valueOf(chosenProjectId);
            userProjectPermissionDto.setChosenProject(projectService.findUserProjectByProjectId(projectId, token.getId()));
        }
        return RestResponse.ok(userProjectPermissionDto);
    }

    @PostMapping(value = "/addUserToProject")
    public RestResponse addUserToProject(HttpServletRequest request, @RequestBody User userRequest, int projectId) {
        Token token = jwtService.getClaimsFromToken(request.getHeader(tokenHeader));
        if (token == null) {
            return RestResponse.error(ErrorStatus.INVALID_TOKEN_HEADER, ErrorMessage.INVALID_TOKEN_HEADER);
        }

        Pair<Integer, String> error = userService.validateProject(userRequest, projectId);
        if(error != null){
            return RestResponse.error(error.getKey(), error.getValue());
        }

        return RestResponse.ok(userService.addUserToProject(userRequest, projectId));
    }

    @PostMapping(value = "/fetchUserProfile")
    public RestResponse fetchUserProfile(HttpServletRequest request, @RequestBody ProjectFilterRequestDto projectFilterRequestDto) {
        Token token = jwtService.getClaimsFromToken(request.getHeader(tokenHeader));
        if (token == null) {
            return RestResponse.error(ErrorStatus.INVALID_TOKEN_HEADER, ErrorMessage.INVALID_TOKEN_HEADER);
        }

        //todo реализовать активность пользователя
        int userId = projectFilterRequestDto.getUserId();
        User user = userService.getUserProfile(userId);

        return RestResponse.ok(user);
    }

    @PostMapping(value = "/fetchUsers")
    public RestResponse fetchUsers(HttpServletRequest request, @RequestBody Integer projectId) {
        Token token = jwtService.getClaimsFromToken(request.getHeader(tokenHeader));
        if (token == null) {
            return RestResponse.error(ErrorStatus.INVALID_TOKEN_HEADER, ErrorMessage.INVALID_TOKEN_HEADER);
        }

        List<User> usersInProject = userService.findUsersInProject(projectId);
        return RestResponse.ok(usersInProject);
    }
}
