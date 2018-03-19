package ru.process.platform.ProjectManagement.entity.task;

import lombok.Data;
import ru.process.platform.ProjectManagement.entity.project.Project;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.utils.JpaUtils;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Time;
import java.util.Date;

@Entity
@Data
@Table(name = JpaUtils.TASK_TABLE_NAME)
public class Task implements ITask{

    private String title;
    private Status status;
    private TaskType taskType;
    private Priority taskPriority;
    private Date dateEnd;
    private Time time;
    private String description;

    public enum Status {
        OPEN, REOPEN, RESOLVED, IN_PROGRESS, finished, ARCHIVE
    }

    public enum TaskType {
        BUG, NEW_FEATURE, IMPROVEMENT
    }

    public enum Priority {
        BLOCKER, MAJOR, CRITICAL, MINOR
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Override
    @NotNull
    public String getTitle() {
        return title;
    }

    @Override
    @NotNull
    @Enumerated(EnumType.STRING)
    public Status getStatusTask() {
        return status;
    }

    @Override
    @NotNull
    @Enumerated(EnumType.STRING)
    public Priority getTaskPriority() {
        return taskPriority;
    }

    @Override
    @NotNull
    @Enumerated(EnumType.STRING)
    public TaskType getTaskType() {
        return taskType;
    }

    @Override
    public Date getDateEnd() {
        return dateEnd;
    }

    @Override
    public Time getTime() {
        return time;
    }

    @Override
    public String getDescription() {
        return description;
    }

    @ManyToOne
    @JoinColumn(name = JpaUtils.PROJECT_PRIMARY_KEY)
    private Project primaryProject;

    @ManyToOne
    @JoinColumn(name = JpaUtils.USER_PRIMARY_KEY)
    private User assignee;

    @ManyToOne
    private User reporter;
}
