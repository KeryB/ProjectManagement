package ru.process.platform.ProjectManagement.ws.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.process.platform.ProjectManagement.dto.filter.ProjectFilterRequestDto;
import ru.process.platform.ProjectManagement.dto.response.UserProjectPermissionDto;
import ru.process.platform.ProjectManagement.entity.RestResponse;
import ru.process.platform.ProjectManagement.entity.jwt.Token;
import ru.process.platform.ProjectManagement.service.ProjectService;
import ru.process.platform.ProjectManagement.service.UserService;
import ru.process.platform.ProjectManagement.service.security.JwtService;
import ru.process.platform.ProjectManagement.utils.error.ErrorMessage;
import ru.process.platform.ProjectManagement.utils.error.ErrorStatus;

import javax.servlet.http.HttpServletRequest;

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

    @RequestMapping(value = "/fetchProjectData", method = RequestMethod.POST)
    public RestResponse fetchProjectData(HttpServletRequest request, @RequestBody ProjectFilterRequestDto filterRequestDto){
        String header = request.getHeader(tokenHeader);
        Token token = jwtService.getClaimsFromToken(header);

        if(token ==null){
            return RestResponse.error(ErrorStatus.INVALID_TOKEN_HEADER, ErrorMessage.INVALID_TOKEN_HEADER);
        }
        UserProjectPermissionDto projectPermission = projectService.getProjectPermission(token.getId(), filterRequestDto);

        return RestResponse.ok(projectPermission);
    }
}
