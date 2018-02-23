package ru.process.platform.ProjectManagement.ws.config.filter;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import ru.process.platform.ProjectManagement.entity.jwt.JwtWrapper;
import ru.process.platform.ProjectManagement.entity.jwt.Token;
import ru.process.platform.ProjectManagement.entity.jwt.UserDetailsImpl;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.service.UserService;
import ru.process.platform.ProjectManagement.service.security.JwtService;
import ru.process.platform.ProjectManagement.utils.HttpUtils;
import ru.process.platform.ProjectManagement.utils.error.ErrorMessage;
import ru.process.platform.ProjectManagement.utils.error.ErrorStatus;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;

    @Value("${jwt.header}")
    private String tokenHeader;
    @Value("${role.header}")
    private String roleHeader;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {

        if (SecurityContextHolder.getContext().getAuthentication() == null
                && !request.getRequestURI().startsWith("/api/auth")) {
            String header = request.getHeader(tokenHeader);
            Token token = jwtService.getClaimsFromToken(header);
            if(token == null){
                HttpUtils.writeError(response, ErrorStatus.INVALID_TOKEN_HEADER, ErrorMessage.INVALID_TOKEN_HEADER);
                return;
            }
            User user = userService.findById(token.getId());
            if(user == null){
                HttpUtils.writeError(response, ErrorStatus.TOKEN_SHOULD_BE_REFRESHED, ErrorMessage.REFRESH_TOKEN_REQUIRED_MESSAGE);
                return;
            }
            if(jwtService.validateToken(token) && !jwtService.isTokenExpired(token.getExpiration())){
                UserDetails userDetails = JwtWrapper.wrap(user);
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                request.setAttribute("token", token);
                response.addHeader(roleHeader, user.getRole().name());
            } else {
                HttpUtils.writeError(response, ErrorStatus.TOKEN_SHOULD_BE_REFRESHED, ErrorMessage.REFRESH_TOKEN_REQUIRED_MESSAGE);
                return;
            }
        }
        chain.doFilter(request, response);
    }
}
