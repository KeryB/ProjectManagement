package ru.process.platform.ProjectManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.process.platform.ProjectManagement.dto.request.RegistrationRequestDto;
import ru.process.platform.ProjectManagement.dto.response.UserProjectPermissionDto;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.entity.user.UserRole;
import ru.process.platform.ProjectManagement.repository.UserProjectRepository;
import ru.process.platform.ProjectManagement.repository.UserRepository;

import java.util.Date;
import java.util.List;

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
            userProjectPermissionDto.setCountProjects(userProjectRepository.countAllByPrimaryUserId(userId));
        }
        return userProjectPermissionDto;
    }

}
