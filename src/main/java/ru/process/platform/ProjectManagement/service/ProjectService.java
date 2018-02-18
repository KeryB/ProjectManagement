package ru.process.platform.ProjectManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.process.platform.ProjectManagement.dto.response.UserProjectPermissionDto;
import ru.process.platform.ProjectManagement.repository.ProjectRepository;
import ru.process.platform.ProjectManagement.repository.UserProjectRepository;
import ru.process.platform.ProjectManagement.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserProjectRepository userProjectRepository;


    public List<UserProjectPermissionDto.ProjectPermission> getProjectPermission(int userId) {

        return userProjectRepository.findByUserId(userId)
                .stream()
                .map(element -> {
                    UserProjectPermissionDto.ProjectPermission projectPermission = new UserProjectPermissionDto.ProjectPermission();
                    projectPermission.setProject(element.getPrimaryProject());
                    projectPermission.setPermission(element.getPermission());
                    return projectPermission;
                })
                .collect(Collectors.toList());
    }

}
