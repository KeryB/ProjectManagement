package ru.process.platform.ProjectManagement.ws.rest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.process.platform.ProjectManagement.entity.RestResponse;
import ru.process.platform.ProjectManagement.entity.jwt.JwtAuthenticationRequest;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.service.security.JwtService;
import ru.process.platform.ProjectManagement.service.UserService;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping(value = "api/auth", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class AuthenticationRestController {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationRestController(JwtService jwtService, UserService userService, AuthenticationManager authenticationManager) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public RestResponse login(@RequestBody @Valid JwtAuthenticationRequest authRequest,
                              HttpServletResponse response) {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(),
                        authRequest.getPassword());
//        try {
//            final Authentication authentication = authenticationManager.authenticate(authenticationToken);
//        } catch (Exception ex){
//            return RestResponse.error()
//        }
//        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userService.findByEmail(authRequest.getEmail());
        final String token = jwtService.buildJwtToken(user);
        return RestResponse.ok(token);
    }

}
