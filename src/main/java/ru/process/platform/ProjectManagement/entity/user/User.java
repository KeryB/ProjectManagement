package ru.process.platform.ProjectManagement.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import ru.process.platform.ProjectManagement.utils.JpaUtils;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = JpaUtils.USERS_TABLE_NAME)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Pattern(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")
    private String email;

    @JsonIgnore
    @Size(min=5,max=100)
    @Pattern(regexp = "(\\w|\\D)+")
    private String password;

    @JsonIgnore
    @DateTimeFormat(pattern = "MM/dd/yyyy")
    private Date creation_date;

    @Size(min = 3,max = 64)
    @Pattern(regexp = "([А-аЯ-я]|[A-aZ-z]|\\d)+")
    private String first_name;

    @Size(min = 3,max = 64)
    @Pattern(regexp = "([А-аЯ-я]|[A-aZ-z]|\\d)+")
    private String second_name;

    @Size(min = 3,max = 64)
    @Pattern(regexp = "([А-аЯ-я]|[A-aZ-z]|\\d)+")
    private String nickname;

    private UserRole role;

    @JsonIgnore
    private  String googleId;

}
