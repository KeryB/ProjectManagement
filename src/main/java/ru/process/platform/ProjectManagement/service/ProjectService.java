package ru.process.platform.ProjectManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.process.platform.ProjectManagement.dto.filter.ProjectFilterRequestDto;
import ru.process.platform.ProjectManagement.dto.response.UserProjectPermissionDto;
import ru.process.platform.ProjectManagement.entity.UserProject;
import ru.process.platform.ProjectManagement.entity.project.Project;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.repository.ProjectRepository;
import ru.process.platform.ProjectManagement.repository.UserProjectRepository;
import ru.process.platform.ProjectManagement.repository.UserRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserProjectRepository userProjectRepository;


    @Transactional
    public UserProjectPermissionDto getProjectPermission(int userId, ProjectFilterRequestDto filter) {
        User user = userRepository.findOne(userId);

        UserProjectPermissionDto userProjectPermissionDto = new UserProjectPermissionDto();

        List<UserProjectPermissionDto.ProjectPermission> projectPermissions = new ArrayList<>();
        if(user != null){
            Pageable pageRequest = new PageRequest(filter.getCurrent() - 1, filter.getPageSize());

            if(filter.getProjectName() != null){

                Page<UserProjectPermissionDto.ProjectPermission> filterProjectPermissions= userProjectRepository.findByPrimaryProjectTitleContaining(filter.getProjectName(), pageRequest)
                        .map(userProject -> {
                            UserProjectPermissionDto.ProjectPermission projectPermission = new UserProjectPermissionDto.ProjectPermission();
                            projectPermission.setProject(userProject.getPrimaryProject());
                            projectPermission.setPermission(userProject.getPermission());
                            return projectPermission;
                        });
                projectPermissions = filterProjectPermissions.getContent();
                userProjectPermissionDto.setTotalPages(filterProjectPermissions.getTotalPages());
            } else {
                Page<UserProjectPermissionDto.ProjectPermission> allProjectPermissions = userProjectRepository.findAll(pageRequest)
                        .map(userProject -> {
                            UserProjectPermissionDto.ProjectPermission projectPermission = new UserProjectPermissionDto.ProjectPermission();
                            projectPermission.setProject(userProject.getPrimaryProject());
                            projectPermission.setPermission(userProject.getPermission());
                            return projectPermission;
                        });
                projectPermissions = allProjectPermissions.getContent();
                userProjectPermissionDto.setTotalPages(allProjectPermissions.getTotalPages());
            }
            userProjectPermissionDto.setProjectPermissions(projectPermissions);
        }
        return userProjectPermissionDto;
    }

    public Project findOne(int id) {
        return projectRepository.findOne(id);
    }

    public UserProjectPermissionDto.ProjectPermission findUserProjectByProjectId(int projectId) {
        UserProject userProject = userProjectRepository.findByPrimaryProject_Id(projectId);
        if(userProject == null){
            return null;
        }
        UserProjectPermissionDto.ProjectPermission chosenProject = new UserProjectPermissionDto.ProjectPermission();
        chosenProject.setPermission(userProject.getPermission());
        chosenProject.setProject(userProject.getPrimaryProject());
        return chosenProject;
    }

    public UserProject saveProject(Project project, User user) {

        user.setLead(true);
        project.setCreationDate(new Date());
        Project savedProject = projectRepository.save(project);

        UserProject userProject = new UserProject();
        userProject.setPermission(UserProject.Permission.MANAGER);
        userProject.setPrimaryProject(savedProject);
        userProject.setPrimaryUser(user);
        return userProjectRepository.save(userProject);
    }

    public List<Project> findProjects(int userId, ProjectFilterRequestDto filterRequestDto) {

        Page<Project> projects = userProjectRepository.findByUserId(userId, new PageRequest(filterRequestDto.getCurrent(), filterRequestDto.getPageSize()))
                .map(UserProject::getPrimaryProject);

        return projects.getContent();
    }
}
