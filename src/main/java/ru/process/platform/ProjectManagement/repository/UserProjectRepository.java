package ru.process.platform.ProjectManagement.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.process.platform.ProjectManagement.entity.UserProject;


@Repository
public interface UserProjectRepository extends JpaRepository<UserProject, Integer> {

    @Query("select us from UserProject us where us.primaryUser.id=:userId ")
    Page<UserProject> findByUserId(@Param("userId") int userId, Pageable pageable);

    @Query("select us from UserProject us where us.primaryProject.title like CONCAT(?1,'%')")
    Page<UserProject> findByPrimaryProjectTitle(String title, Pageable pageable);

    Page<UserProject> findAll (Pageable pageable);

    UserProject findByPrimaryProject_Id (int projectId);
}
