package ru.process.platform.ProjectManagement.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.utils.JpaUtils;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = JpaUtils.USER_PROJECT_TABLE_NAME)
public class UserProject {

    public enum Permission {
        CUSTOMER,
        MANAGER,
        PROGRAMMER
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = JpaUtils.USER_PRIMARY_KEY)
    private User primaryUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = JpaUtils.PROJECT_PRIMARY_KEY)
    private Project primaryProject;

    @Enumerated(value = EnumType.STRING)
    private Permission permission;
}
