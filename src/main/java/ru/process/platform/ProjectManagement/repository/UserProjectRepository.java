package ru.process.platform.ProjectManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.process.platform.ProjectManagement.entity.UserProject;

import java.util.List;

@Repository
public interface UserProjectRepository extends JpaRepository<UserProject, Integer> {
    @Query("select us from UserProject us where us.primaryUser.id=:userId")
    List<UserProject> findByUserId(@Param("userId") int userId);
}
