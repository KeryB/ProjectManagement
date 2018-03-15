package ru.process.platform.ProjectManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.process.platform.ProjectManagement.dto.filter.ProjectFilterRequestDto;
import ru.process.platform.ProjectManagement.dto.response.UserProjectPermissionDto;
import ru.process.platform.ProjectManagement.entity.UserProject;
import ru.process.platform.ProjectManagement.entity.project.Project;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.repository.ProjectRepository;
import ru.process.platform.ProjectManagement.repository.UserProject.UserProjectRepository;
import ru.process.platform.ProjectManagement.repository.UserRepository;
import ru.process.platform.ProjectManagement.repository.jdbcTemplate.Paging;
import ru.process.platform.ProjectManagement.service.predicates.SpecificationService;

import java.util.Date;
import java.util.List;

@Service
public class ProjectService {

    private final UserRepository userRepository;

    private final ProjectRepository projectRepository;

    private final UserProjectRepository userProjectRepository;

    private final SpecificationService specificationService;

    @Autowired
    public ProjectService(SpecificationService specificationService, UserRepository userRepository, ProjectRepository projectRepository, UserProjectRepository userProjectRepository) {
        this.specificationService = specificationService;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.userProjectRepository = userProjectRepository;
    }

    public UserProjectPermissionDto getProjectPermission(int userId, ProjectFilterRequestDto filter) {
        User user = userRepository.findOne(userId);

        UserProjectPermissionDto userProjectPermissionDto = new UserProjectPermissionDto();

        if (user != null) {
            Pageable pageRequest = new PageRequest(filter.getCurrent() - 1, filter.getPageSize());

            Specification<UserProject> specification = specificationService.getProjectSpecification(userId, filter);
            Page<UserProject> userProjects = userProjectRepository.findAll(specification, pageRequest);

            userProjects.forEach(userProject -> {
                Project primaryProject = userProject.getPrimaryProject();
                Specification<UserProject> projectLeadSpecification = specificationService.getProjectLeadSpecification(primaryProject.getId());
                UserProject userLead = userProjectRepository.findOne(projectLeadSpecification);
                userProject.setPrimaryUser(userLead.getPrimaryUser());
            });

            userProjectPermissionDto.setUserProjects(userProjects.getContent());
            userProjectPermissionDto.setPaging(new Paging<>(pageRequest, userProjects));
        }
        return userProjectPermissionDto;
    }

    public Project findOne(int id) {
        return projectRepository.findOne(id);
    }

    public UserProject findUserProjectByProjectId(Integer projectId, int userId) {
        UserProject userProject = userProjectRepository.findByPrimaryProjectIdAndPrimaryUserId(projectId, userId);
        if (userProject == null) {
            return null;
        }

        return userProject;
    }

    @Transactional
    public UserProject saveProject(Project project, User user) {

        project.setCreationDate(new Date());
        project.setProjectStatus(Project.ProjectStatus.processing);
        Project savedProject = projectRepository.save(project);

        UserProject userProject = new UserProject();
        userProject.setPermission(UserProject.Permission.MANAGER);
        userProject.setLead(true);
        userProject.setOwner(true);
        userProject.setPrimaryProject(savedProject);
        userProject.setPrimaryUser(user);
        return userProjectRepository.save(userProject);
    }

    @Transactional
    public List<Project> findProjects(int userId, ProjectFilterRequestDto filterRequestDto) {

        Page<Project> projects = userProjectRepository.findByPrimaryUserIdOrderByPrimaryProjectCreationDateDesc(userId, new PageRequest(filterRequestDto.getCurrent(), filterRequestDto.getPageSize()))
                .map(UserProject::getPrimaryProject);

        return projects.getContent();
    }

//    @Transactional
//    public void getProjectData(int projectId) {
//        specificationService.getProjectLeadSpecification()
//        userProjectRepository.find
//    }

}
