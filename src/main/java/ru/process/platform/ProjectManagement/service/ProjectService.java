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

    private final UserRepository userRepository;

    private final ProjectRepository projectRepository;

    private final UserProjectRepository userProjectRepository;

    @Autowired
    public ProjectService(UserRepository userRepository, ProjectRepository projectRepository, UserProjectRepository userProjectRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.userProjectRepository = userProjectRepository;
    }


    @Transactional
    public UserProjectPermissionDto getProjectPermission(int userId, ProjectFilterRequestDto filter) {
        User user = userRepository.findOne(userId);

        UserProjectPermissionDto userProjectPermissionDto = new UserProjectPermissionDto();

        if(user != null){
            Pageable pageRequest = new PageRequest(filter.getCurrent() - 1, filter.getPageSize());

            if(filter.getProjectName() != null){

                Page<UserProject> pageProjects = userProjectRepository.findByPrimaryProjectTitleContaining(filter.getProjectName(), pageRequest);
                List<UserProject> userProjects = pageProjects.getContent();

                userProjectPermissionDto.setUserProjects(userProjects);
                userProjectPermissionDto.setTotalPages(pageProjects.getTotalPages());
            } else {
                Page<UserProject> pageProjects = userProjectRepository.findAll(pageRequest);
                List<UserProject> userProjects = pageProjects.getContent();

                userProjectPermissionDto.setUserProjects(userProjects);
                userProjectPermissionDto.setTotalPages(pageProjects.getTotalPages());
            }
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
