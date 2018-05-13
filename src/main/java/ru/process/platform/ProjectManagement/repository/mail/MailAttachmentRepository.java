package ru.process.platform.ProjectManagement.repository.mail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.process.platform.ProjectManagement.entity.mail.MailAttachments;

import java.util.List;

@Repository
public interface MailAttachmentRepository extends JpaRepository<MailAttachments, Integer> {
    List<MailAttachments> findByMailId(Integer mailId);
}
