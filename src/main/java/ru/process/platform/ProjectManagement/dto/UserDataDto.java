package ru.process.platform.ProjectManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.process.platform.ProjectManagement.entity.Project;
import ru.process.platform.ProjectManagement.entity.UserProject;
import ru.process.platform.ProjectManagement.entity.user.User;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDataDto {

    @Getter
    @Setter
    public static class ProjectPermission {
        private Project project;
        private UserProject.Permission permission;
    }

    private User user;
    private List<ProjectPermission> projectPermissions;
}
