package ru.process.platform.ProjectManagement.dto.request;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import ru.process.platform.ProjectManagement.entity.task.Task;

import java.sql.Time;
import java.util.Date;

@Getter
@Setter
@EqualsAndHashCode
public class TaskRequestDto {

    private String title;
    private Task.TaskType taskType;
    private Task.Priority taskPriority;
    private String description;
    private Date dateEnd;
    private Time time;
    private Integer projectId;
    private Integer userId;

}
