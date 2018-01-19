package ru.process.platform.ProjectManagement.ws.rest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.process.platform.ProjectManagement.dto.AuthenticationRequestDto;
import ru.process.platform.ProjectManagement.dto.RegistrationDto;
import ru.process.platform.ProjectManagement.entity.RestResponse;
import ru.process.platform.ProjectManagement.entity.jwt.Token;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.service.UserService;
import ru.process.platform.ProjectManagement.service.security.JwtService;
import ru.process.platform.ProjectManagement.utils.error.ErrorMessage;
import ru.process.platform.ProjectManagement.utils.error.ErrorStatus;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping(value = "api/auth", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class AuthenticationRestController {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Value("${role.header}")
    private String roleHeader;

    @Autowired
    public AuthenticationRestController(JwtService jwtService, UserService userService, AuthenticationManager authenticationManager) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public RestResponse login(@RequestBody @Valid AuthenticationRequestDto authRequest,
                              HttpServletResponse response) {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(),
                        authRequest.getPassword());
        Authentication authentication = null;
        try {
            authentication = authenticationManager.authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception ex) {
            return RestResponse.error(ErrorStatus.EMAIL_OR_PASSWORD_IS_NOT_CORRECT, ErrorMessage.EMPTY_FIELD);
        }
        User user = userService.findByEmail(authRequest.getEmail());
        final String token = jwtService.buildJwtToken(user);
        return RestResponse.ok(token);
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public RestResponse register(@RequestBody @Valid RegistrationDto registrationDto, HttpServletResponse response) {

        if (userService.findByEmail(registrationDto.getEmail()) != null) {
            return RestResponse.error(ErrorStatus.EMAIL_NOT_UNIQUE, ErrorMessage.EMAIL_NOT_UNIQUE);
        }
        User user = userService.registerUser(registrationDto);
        String token = jwtService.buildJwtToken(user);
        response.addHeader(roleHeader, user.getRole().name());
        return RestResponse.ok(token);
    }

    @PostMapping(value = "/update_token")
    public RestResponse updateToken(@RequestHeader(value = "${jwt.header}") String tokenHeader, HttpServletResponse response) {

        Token token = jwtService.getClaimsFromToken(tokenHeader);
        if(token == null){
            return RestResponse.error(ErrorStatus.INVALID_TOKEN_HEADER, ErrorMessage.INVALID_TOKEN_HEADER);
        }
        User user = userService.findById(token.getId());
        if(user == null){
            return RestResponse.error(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
        }
        if(jwtService.isTokenExpired(token.getExpiration())){
            String refreshedToken = jwtService.buildJwtToken(user);
            return RestResponse.ok(refreshedToken);
        } else {
            return RestResponse.error(ErrorStatus.TOKEN_COULD_NO_BE_REFRESHED_NOW, ErrorMessage.TOKEN_COULD_NO_BE_REFRESHED_NOW);
        }
    }

}
