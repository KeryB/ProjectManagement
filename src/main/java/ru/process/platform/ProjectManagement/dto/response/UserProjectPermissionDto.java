package ru.process.platform.ProjectManagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.process.platform.ProjectManagement.entity.project.Project;
import ru.process.platform.ProjectManagement.entity.UserProject;
import ru.process.platform.ProjectManagement.entity.user.User;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProjectPermissionDto {

    @Getter
    @Setter
    public static class ProjectPermission {
        private Project project;
        private UserProject.Permission permission;
    }

    private User user;
    private List<ProjectPermission> projectPermissions;
    private int totalPages;
    private ProjectPermission chosenProject;
}
