package ru.process.platform.ProjectManagement.service.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.process.platform.ProjectManagement.entity.mail.Mail;
import ru.process.platform.ProjectManagement.repository.MailRepository;
import ru.process.platform.ProjectManagement.repository.UserRepository;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Part;
import javax.mail.internet.MimeUtility;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
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

//    TEXT/HTML;charset=UTF-8

    public void createAndSaveMessage(Message message) {
        try {
            Mail mailMessage = new Mail();
            mailMessage.setSubject(message.getSubject());
            mailMessage.setReceivedDate(message.getReceivedDate());
            mailMessage.setMessageFrom(message.getFrom()[0].toString());
            if (message.isMimeType("text/plain")) {
                mailMessage.setContent((String) message.getContent());
            } else if (message.isMimeType("multipart/*")) {
                Multipart multipart = (Multipart) message.getContent();
                for (int i = 0; i < multipart.getCount(); i++) {
                    Part part = multipart.getBodyPart(i);
//                    if ((part.getFileName() == null || part.getFileName().equals("")) && part.isMimeType("TEXT/HTML;charset=UTF-8")){
//                        mailMessage.setContent((String) part.getContent());
//                        System.out.print((String) part.getContent());
//                    } else if (part.getFileName() != null || !part.getFileName().equals("")){
//                        if ((part.getDisposition() != null) && (part.getDisposition().equals(Part.ATTACHMENT))) {
//                            String s = saveFile(MimeUtility.decodeText(part.getFileName()), part.getInputStream());
//                            System.out.print(s);
//                        }
//                    }

                    String disposition = part.getDisposition();
                    if((part.getDisposition() != null) && (part.getDisposition().equalsIgnoreCase(Part.ATTACHMENT))){
                        String s = saveFile(MimeUtility.decodeText(part.getFileName()), part.getInputStream());
                        System.out.print(s);
                    } else {
                        String content = (String) part.getContent();
                        if(content != null){
                            mailMessage.setContent( MimeUtility.decodeText(content));
                        }
                    }
                }
            }
        } catch (MessagingException | IOException e) {
            e.printStackTrace();
        }
    }

    private static String saveFile(String filename, InputStream input) {
        String path = "attachments/"+filename;
        try {
            int read1 = input.read();
            byte[] attachment = new byte[input.available()];
            int read = input.read(attachment);
            File file = new File(path);
            FileOutputStream out = new FileOutputStream(file);
            out.write(attachment);
            input.close();
            out.close();
            return path;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return path;
    }

    public Mail getLastMessage() {
        List<Mail> allMails = mailRepository.findAll(new PageRequest(0, 10, Sort.Direction.DESC, "receivedDate")).getContent();
        if (allMails.isEmpty()) {
            return null;
        }

        return allMails.get(0);
    }
}
