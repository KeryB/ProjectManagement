package ru.process.platform.ProjectManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.process.platform.ProjectManagement.dto.RegistrationDto;
import ru.process.platform.ProjectManagement.dto.UserDataDto;
import ru.process.platform.ProjectManagement.entity.UserProject;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.entity.user.UserRole;
import ru.process.platform.ProjectManagement.repository.UserProjectRepository;
import ru.process.platform.ProjectManagement.repository.UserRepository;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserProjectRepository userProjectRepository;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserProjectRepository userProjectRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userProjectRepository = userProjectRepository;
    }

    public User findById(int id) {
        return userRepository.findOne(id);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User registerUser(RegistrationDto registrationDto) {
        User user = new User();
        user.setEmail(registrationDto.getEmail());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        user.setFirstName(registrationDto.getFirstName());
        user.setSecondName(registrationDto.getSecondName());
        user.setCreationDate(new Date());
        user.setNickname(registrationDto.getNickname());
        user.setRole(UserRole.NOT_IN_PROJECT);
        return userRepository.save(user);
    }

    public UserDataDto getUserData(int userId){
        UserDataDto userDataDto = new UserDataDto();
        User user = userRepository.findOne(userId);
        if(user != null){
            userDataDto.setUser(user);
            List<UserDataDto.ProjectPermission> projectPermissions = userProjectRepository.findByUserId(user.getId())
                    .stream()
                    .map(userProject -> {
                        UserDataDto.ProjectPermission projectPermission = new UserDataDto.ProjectPermission();
                        projectPermission.setPermission(userProject.getPermission());
                        projectPermission.setProject(userProject.getPrimaryProject());
                        return projectPermission;
                    })
                    .collect(Collectors.toList());
            projectPermissions.forEach(e->{
                int id = e.getProject().getId();
                String title = e.getProject().getShortTitle();
            });
            userDataDto.setProjectPermissions(projectPermissions);
        }
        return userDataDto;
    }
    public List<UserProject> findUserProjectById(int userId){
        return userProjectRepository.findByUserId(userId);
    }

}
