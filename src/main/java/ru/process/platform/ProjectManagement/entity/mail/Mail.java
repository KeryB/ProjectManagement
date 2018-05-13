package ru.process.platform.ProjectManagement.entity.mail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.utils.JpaUtils;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = JpaUtils.MAIL)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Mail {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private long uid;

    private String messageFrom;

    private String subject;

    private Date receivedDate;

    @Lob
    private byte[] content;

    @ManyToOne
    @JoinColumn(name = JpaUtils.USER_PRIMARY_KEY)
    private User primaryUser;
}
