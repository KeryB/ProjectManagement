package ru.process.platform.ProjectManagement.entity.mail;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.process.platform.ProjectManagement.utils.JpaUtils;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = JpaUtils.MAIL_ATTACHMENTS)
public class MailAttachments {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String metaData;

    private String type;

    @Lob
    private byte[] file;

    @ManyToOne
    @JoinColumn(name = JpaUtils.MAIL_PRIMARY_KEY)
    private Mail mail;
}
