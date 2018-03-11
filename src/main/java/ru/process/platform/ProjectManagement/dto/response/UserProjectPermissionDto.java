package ru.process.platform.ProjectManagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.process.platform.ProjectManagement.entity.UserProject;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.repository.jdbcTemplate.Paging;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProjectPermissionDto {

    private User user;
    private List<UserProject> userProjects;
    private UserProject chosenProject;
    private Paging paging;
}
