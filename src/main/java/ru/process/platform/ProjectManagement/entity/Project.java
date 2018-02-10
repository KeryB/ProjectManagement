package ru.process.platform.ProjectManagement.entity;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.process.platform.ProjectManagement.utils.JpaUtils;

import javax.persistence.*;
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

    private String title;

    private String shortTitle;

    private String description;

    private Date creationDate;
}
