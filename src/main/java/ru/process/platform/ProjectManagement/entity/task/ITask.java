package ru.process.platform.ProjectManagement.entity.task;

import java.sql.Time;
import java.util.Date;

public interface ITask {

    String getTitle();

    Task.Status getStatusTask();

    Task.Priority getTaskPriority();

    Task.TaskType getTaskType();

    Date getDateEnd();

    Time getTime();

    String getDescription();
}
