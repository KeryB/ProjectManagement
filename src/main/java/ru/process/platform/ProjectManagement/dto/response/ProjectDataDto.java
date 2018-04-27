package ru.process.platform.ProjectManagement.dto.response;

import lombok.Getter;
import lombok.Setter;
import ru.process.platform.ProjectManagement.dto.AbstractDto;
import ru.process.platform.ProjectManagement.entity.project.Project;
import ru.process.platform.ProjectManagement.entity.user.User;

import java.util.List;


@Setter
@Getter
public class ProjectDataDto extends AbstractDto{

    private List<User> users;
    private Project project;

}
