package ru.process.platform.ProjectManagement.ws.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.process.platform.ProjectManagement.entity.RestResponse;
import ru.process.platform.ProjectManagement.entity.mail.Mail;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.service.mail.MailMessageService;
import ru.process.platform.ProjectManagement.ws.config.MappedUser;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping(value = "/api/mail",consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class MailController {

    private MailMessageService mailMessageService;

    @Autowired
    public MailController(MailMessageService mailMessageService) {
        this.mailMessageService = mailMessageService;
    }

    @PostMapping(value = "/getMailsList")
    public RestResponse getMailsList (HttpServletRequest request, @MappedUser User user){
        List<Mail> mails = mailMessageService.getMails(user.getId());
        return null;
    }
}
