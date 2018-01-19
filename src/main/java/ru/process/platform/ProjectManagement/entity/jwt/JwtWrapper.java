package ru.process.platform.ProjectManagement.entity.jwt;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.entity.user.UserRole;

import java.util.Collection;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class JwtWrapper {

    public static UserDetails wrap(User user){
        UserDetailsImpl userDetails = new UserDetailsImpl();
        userDetails.setLogin(user.getEmail());
        userDetails.setPassword(user.getPassword());
        userDetails.setEnabled(true);
        userDetails.setAuthorities(setAuthorities(user.getRole()));
        return userDetails;
    }

    private static Collection<? extends GrantedAuthority> setAuthorities(UserRole...userRoles) {
        return Stream.of(userRoles)
                .map(role-> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
    }
}
