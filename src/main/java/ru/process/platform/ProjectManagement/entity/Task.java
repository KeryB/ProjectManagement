package ru.process.platform.ProjectManagement.entity;

import lombok.Data;
import ru.process.platform.ProjectManagement.entity.project.Project;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.utils.JpaUtils;

import javax.persistence.*;

@Entity
@Data
@Table(name = JpaUtils.TASK_TABLE_NAME)
public class Task {

    public enum Status {
        RESOLVED, IN_PROGRESS, finished
    }

    public enum TaskType {
        major, critical
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String title;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Enumerated(EnumType.STRING)
    private TaskType taskType;

    private String description;

    @ManyToOne
    @JoinColumn(name = JpaUtils.PROJECT_PRIMARY_KEY)
    private Project primaryProject;

    @ManyToOne
    @JoinColumn(name = JpaUtils.USER_PRIMARY_KEY)
    private User user;
}
