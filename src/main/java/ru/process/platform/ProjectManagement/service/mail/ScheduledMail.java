package ru.process.platform.ProjectManagement.service.mail;

import com.sun.mail.imap.IMAPFolder;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.PostConstruct;
import javax.mail.*;
import java.util.Properties;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class ScheduledMail {

    private MailMessageService mailMessageService;
    private ScheduledExecutorService scheduledExecutorService;

    @Autowired
    public ScheduledMail(MailMessageService mailMessageService) {
        this.mailMessageService = mailMessageService;
    }

    @PostConstruct
    public void getInstance() {
        scheduledExecutorService.scheduleAtFixedRate(()->{
            try {
                Properties properties = getProperties();
                Session emailSession = Session.getDefaultInstance(properties);
                Store store = emailSession.getStore("imaps");
                store.connect( "imap.googlemail.com","bulychevkery@gmail.com", "voka803519");

                Folder emailFolder = store.getFolder("INBOX");
                emailFolder.open(Folder.READ_ONLY);

                IMAPFolder imapFolder = (IMAPFolder) emailFolder;
                emailFolder.addMessageChangedListener(messageListener->{
                    Message message = messageListener.getMessage();
                    mailMessageService.saveMail(message);
                });

            } catch (NoSuchProviderException e) {
                e.printStackTrace();
            } catch (MessagingException e) {
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }, 1,5, TimeUnit.MINUTES);
    }

    private Properties getProperties() {
        Properties properties = new Properties();
        properties.put("mail.imap.host",  "imap.gmail.com");
        properties.put("mail.imap.auth", true);
        properties.put("mail.imap.port", 993);
        properties.put("mail.imap.ssl.enable", true);
        return properties;
    }

}

