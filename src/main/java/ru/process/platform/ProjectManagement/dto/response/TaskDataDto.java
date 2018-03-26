package ru.process.platform.ProjectManagement.dto.response;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import ru.process.platform.ProjectManagement.entity.Comment;
import ru.process.platform.ProjectManagement.entity.project.Project;
import ru.process.platform.ProjectManagement.entity.task.Task;
import ru.process.platform.ProjectManagement.entity.user.User;

import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
public class TaskDataDto {
    private Task task;
    private List<Comment> comments;
    private List<User> users;
    private Project project;
}
