package ru.process.platform.ProjectManagement.repository.UserProject;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ru.process.platform.ProjectManagement.entity.UserProject;


public interface UserProjectRepository extends JpaRepository<UserProject, Integer>, JpaSpecificationExecutor<UserProject> {

    Page<UserProject> findByPrimaryUserIdOrderByPrimaryProjectCreationDateDesc(int userId, Pageable pageable);

    int countAllByPrimaryUserId(int userId);

    UserProject findByPrimaryProjectIdAndPrimaryUserId (int projectId, int userId);

}
