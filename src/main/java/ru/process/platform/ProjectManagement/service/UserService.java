package ru.process.platform.ProjectManagement.service;

import javafx.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.process.platform.ProjectManagement.dto.request.RegistrationRequestDto;
import ru.process.platform.ProjectManagement.dto.response.UserProjectPermissionDto;
import ru.process.platform.ProjectManagement.entity.UserProject;
import ru.process.platform.ProjectManagement.entity.project.Project;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.entity.user.UserRole;
import ru.process.platform.ProjectManagement.repository.ProjectRepository;
import ru.process.platform.ProjectManagement.repository.UserProject.UserProjectRepository;
import ru.process.platform.ProjectManagement.repository.UserRepository;
import ru.process.platform.ProjectManagement.repository.jdbcTemplate.Paging;
import ru.process.platform.ProjectManagement.utils.error.ErrorMessage;
import ru.process.platform.ProjectManagement.utils.error.ErrorStatus;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserProjectRepository userProjectRepository;
    private final ProjectRepository projectRepository;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserProjectRepository userProjectRepository, ProjectRepository projectRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userProjectRepository = userProjectRepository;
        this.projectRepository = projectRepository;
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

    @Transactional
    public User registerUser(RegistrationRequestDto registrationRequestDto) {
        User user = new User();
        user.setEmail(registrationRequestDto.getEmail());
        user.setPassword(passwordEncoder.encode(registrationRequestDto.getPassword()));
        user.setFirstName(registrationRequestDto.getFirstName());
        user.setSecondName(registrationRequestDto.getSecondName());
        user.setCreationDate(new Date());
        user.setNickname(registrationRequestDto.getNickname());
        user.setRole(UserRole.NOT_IN_PROJECT);
        return userRepository.save(user);
    }

    @Transactional
    public UserProjectPermissionDto getUserData(int userId) {
        UserProjectPermissionDto userProjectPermissionDto = new UserProjectPermissionDto();
        User user = userRepository.findOne(userId);

        if (user != null) {
            userProjectPermissionDto.setUser(user);
            userProjectPermissionDto.setPaging(new Paging(userProjectRepository.countAllByPrimaryUserId(userId)));
        }
        return userProjectPermissionDto;
    }

    public Pair<Integer, String> validateProject(User userRequest, int projectId) {
        Project project = projectRepository.findOne(projectId);
        if (project == null) {
            return new Pair<>(ErrorStatus.INVALID_PROJECT_ID, ErrorMessage.INVALID_PROJECT_ID);
        }
        return null;
    }

    @Transactional
    public User addUserToProject(User userRequest, int projectId) {
//        UserProject userProject = userProjectRepository.findByPrimaryProject_Id(projectId);

//        userProject.setLead(false);
//        userProject.setOwner(false);

        return null;
    }


    @Transactional
    public User saveUser(int id, User userRequest) {
        User newUser = userRepository.findOne(id);
        newUser.setEmail(userRequest.getEmail());
        newUser.setFirstName(userRequest.getFirstName());
        newUser.setSecondName(userRequest.getSecondName());
        newUser.setBirthDay(userRequest.getBirthDay());
        return userRepository.save(newUser);
    }

    public User getUserProfile(int userId) {
        User user = userRepository.findOne(userId);
        return user;
    }

    public List<User> findUsersInProject(Integer projectId) {
        List<User> users = new ArrayList<>();

        if(projectId != null) {
            users = userProjectRepository.findByPrimaryProjectId(projectId)
                    .stream()
                    .map(UserProject::getPrimaryUser)
                    .collect(Collectors.toList());
        }

        return users;
    }
}
