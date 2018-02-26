package ru.process.platform.ProjectManagement.entity.project;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.process.platform.ProjectManagement.utils.JpaUtils;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = JpaUtils.PROJECT_SETTINGS_TABLE_NAME)
public class ProjectSettings {

    @Id
    @GeneratedValue
    private int id;



    @OneToOne
    @JoinColumn(name = JpaUtils.PROJECT_PRIMARY_KEY)
    private Project primaryProject;
}
