package ru.process.platform.ProjectManagement.service.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.process.platform.ProjectManagement.entity.mail.Mail;
import ru.process.platform.ProjectManagement.repository.MailRepository;
import ru.process.platform.ProjectManagement.repository.UserRepository;

import javax.mail.Message;
import java.util.List;

@Service
public class MailMessageService {

    private UserRepository userRepository;
    private MailRepository mailRepository;

    @Autowired
    public MailMessageService(UserRepository userRepository, MailRepository mailRepository) {
        this.userRepository = userRepository;
        this.mailRepository = mailRepository;
    }

    public int countMessages(Integer userId) {
        return mailRepository.countByPrimaryUserId(userId);
    }


    public List<Mail> getMails(Integer userId) {
//        List<Mail> mailList = mailRepository.findByPrimaryUserIdOrderByNumberAsc(userId, new PageRequest(0, 1));
//
//        return mailRepository.findByPrimaryUserIdOrderByNumberAsc(userId);
        return null;
    }

    public void saveMail(Message message) {

    }
}
