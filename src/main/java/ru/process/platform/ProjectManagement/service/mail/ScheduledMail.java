package ru.process.platform.ProjectManagement.service.mail;

import com.sun.mail.imap.IMAPFolder;
import org.springframework.beans.factory.annotation.Autowired;
import ru.process.platform.ProjectManagement.entity.mail.Mail;

import javax.annotation.PostConstruct;
import javax.mail.*;
import java.util.Date;
import java.util.Properties;
import java.util.concurrent.ScheduledExecutorService;


public class ScheduledMail {

    private MailMessageService mailMessageService;
    private ScheduledExecutorService executorService;

    @Autowired
    public ScheduledMail(MailMessageService mailMessageService, ScheduledExecutorService executorService) {
        this.executorService = executorService;
        this.mailMessageService = mailMessageService;
    }

    @PostConstruct
    public void getInstance() {
//        executorService.scheduleAtFixedRate(() -> {
            try {
                Properties properties = getProperties();
                Session emailSession = Session.getDefaultInstance(properties);
                Store store = emailSession.getStore("imaps");
                store.connect("imap.googlemail.com", "bulychevkery@gmail.com", "voka803519");

                Folder emailFolder = store.getFolder("INBOX");
                emailFolder.open(Folder.READ_ONLY);
                IMAPFolder imapFolder = (IMAPFolder) emailFolder;

                System.out.print("Connected");
                Mail lastMail = mailMessageService.getLastMessage();
                int end = imapFolder.getMessageCount();
                int start = Math.max(1, end - 3);

                for (Message message : imapFolder.getMessages(start, end)) {
                    Date date = message.getReceivedDate();
                    if (date == null) continue;

                    if(lastMail == null){
                        mailMessageService.createAndSaveMessage(message);
                        continue;
                    }

                    Date receivedDate = lastMail.getReceivedDate();
                    if (date.before(receivedDate) || date.equals(receivedDate)) {
                        continue;
                    }
                }

            } catch (MessagingException e) {
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }
//        }, 1, 1, TimeUnit.MINUTES);
    }

    private Properties getProperties() {
        Properties properties = new Properties();
        properties.put("mail.imap.host", "imap.gmail.com");
        properties.put("mail.imap.auth", true);
        properties.put("mail.imap.port", 993);
        properties.put("mail.imap.ssl.enable", true);
        return properties;
    }

}

