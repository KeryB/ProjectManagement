package ru.process.platform.ProjectManagement.dto.response;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import ru.process.platform.ProjectManagement.entity.UserProject;
import ru.process.platform.ProjectManagement.entity.task.Task;

import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
public class ProjectTaskDataDto {

    private List<UserProject> users;
    private List<Task> tasks;
}
