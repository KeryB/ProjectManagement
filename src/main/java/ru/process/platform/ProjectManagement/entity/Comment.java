package ru.process.platform.ProjectManagement.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.process.platform.ProjectManagement.entity.task.Task;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.utils.JpaUtils;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = JpaUtils.COMMENT_TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String message;
    private Date creationDate;

    @ManyToOne
    @JoinColumn(name = JpaUtils.TASK_PRIMARY_KEY)
    private Task primaryTask;

    @ManyToOne
    @JoinColumn(name = JpaUtils.USER_PRIMARY_KEY)
    private User primaryUser;

    @ManyToOne
    private User toUser;
}
