package ru.process.platform.ProjectManagement.dto.response;

import lombok.Getter;
import lombok.Setter;
import ru.process.platform.ProjectManagement.entity.mail.Mail;
import ru.process.platform.ProjectManagement.entity.mail.MailAttachments;

import java.util.List;

@Getter
@Setter
public class MailDataDto {
    private Mail mail;
    private List<MailAttachments> mailAttachments;
}
