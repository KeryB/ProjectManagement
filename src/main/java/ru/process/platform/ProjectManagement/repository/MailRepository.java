package ru.process.platform.ProjectManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.process.platform.ProjectManagement.entity.mail.Mail;

@Repository
public interface MailRepository extends JpaRepository<Mail, Integer> {

    int countByPrimaryUserId(Integer userId);

//    List<Mail> findByPrimaryUserIdOrderByNumberAsc(int userId);
//
//    List<Mail> findByPrimaryUserIdOrderByNumberAsc(int userId, Pageable pageable);
}
