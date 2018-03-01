package ru.process.platform.ProjectManagement.entity.project;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.process.platform.ProjectManagement.utils.JpaUtils;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = JpaUtils.PROJECT_TABLE_NAME)
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @NotNull
    private String title;

    private String description;

    @NotNull
    private Date creationDate;

    @NotNull
    private String projectType;

    @OneToOne(mappedBy = "primaryProject")
    private ProjectSettings projectSettings;
}
