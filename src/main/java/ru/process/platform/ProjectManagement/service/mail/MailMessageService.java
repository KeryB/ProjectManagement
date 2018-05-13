package ru.process.platform.ProjectManagement.service.mail;

import com.sun.mail.imap.IMAPFolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.process.platform.ProjectManagement.dto.response.MailDataDto;
import ru.process.platform.ProjectManagement.entity.mail.Mail;
import ru.process.platform.ProjectManagement.entity.mail.MailAttachments;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.repository.UserRepository;
import ru.process.platform.ProjectManagement.repository.mail.MailAttachmentRepository;
import ru.process.platform.ProjectManagement.repository.mail.MailRepository;

import javax.mail.*;
import javax.mail.internet.MimeUtility;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class MailMessageService {

    private UserRepository userRepository;
    private MailRepository mailRepository;
    private MailAttachmentRepository mailAttachmentRepository;

    @Autowired
    public MailMessageService(UserRepository userRepository, MailRepository mailRepository, MailAttachmentRepository mailAttachmentRepository) {
        this.userRepository = userRepository;
        this.mailRepository = mailRepository;
        this.mailAttachmentRepository = mailAttachmentRepository;
    }

    public int countMessages(Integer userId) {
        return mailRepository.countByPrimaryUserId(userId);
    }


    public List<Mail> getMails(Integer userId) {
        return mailRepository.findAll();
    }


    @Transactional
    public void createAndSaveMessage(Message message, IMAPFolder imapFolder) throws MessagingException, IOException {
        Mail mailMessage = new Mail();
        MailAttachments mailAttachments = null;
        mailMessage.setUid(imapFolder.getUID(message));
        mailMessage.setSubject(message.getSubject());
        mailMessage.setReceivedDate(message.getReceivedDate());
        mailMessage.setMessageFrom(message.getFrom()[0].toString());
        if (message.isMimeType("text/plain")) {
            String content = (String) message.getContent();
            mailMessage.setContent(content.getBytes());
        } else if (message.isMimeType("multipart/*")) {
            Multipart multipart = (Multipart) message.getContent();
            for (int i = 0; i < multipart.getCount(); i++) {
                Part part = multipart.getBodyPart(i);
                if ((part.getDisposition() != null) && (part.getDisposition().equalsIgnoreCase(Part.ATTACHMENT))) {
                    mailAttachments = saveFile(part);
                } else {
                    Object content = part.getContent();

                    if (part.getFileName() == null && part.isMimeType("text/html")) {

                        if (content != null) {
                            String html = MimeUtility.decodeText((String) content);
                            mailMessage.setContent(html.getBytes());
                        }
                    }
                }
            }
        }
        User one = userRepository.findOne(52);
        mailMessage.setPrimaryUser(one);
        Mail savedMailMessage = mailRepository.save(mailMessage);

        if (mailAttachments != null) {
            mailAttachments.setMail(savedMailMessage);
            mailAttachmentRepository.save(mailAttachments);
        }
    }

    private MailAttachments saveFile(Part bodyPart) throws MessagingException, IOException {

        MailAttachments mailAttachments = new MailAttachments();

        mailAttachments.setMetaData(MimeUtility.decodeText(bodyPart.getFileName()));
        mailAttachments.setType(bodyPart.getContentType());
        mailAttachments.setFile(new byte[bodyPart.getInputStream().available()]);
        return mailAttachments;
    }

    public List<MailDataDto> getMailMessages(Integer userId) {
        List<MailDataDto> mailDataDtoList = new ArrayList<>();
        mailRepository.findByPrimaryUserId(userId)
                .forEach(mail -> {
                    MailDataDto mailDataDto = new MailDataDto();
                    mailDataDto.setMail(mail);
                    List<MailAttachments> mailAttachments = mailAttachmentRepository.findByMailId(mail.getId());
                    mailDataDto.setMailAttachments(mailAttachments);
                    mailDataDtoList.add(mailDataDto);
                });

        return mailDataDtoList;
    }

    public Mail getLastMessage() {
        List<Mail> allMails = mailRepository.findAll(new PageRequest(0, 10, Sort.Direction.DESC, "receivedDate")).getContent();
        if (allMails.isEmpty()) {
            return null;
        }

        return allMails.get(0);
    }
}
