package ru.process.platform.ProjectManagement.repository.UserProject;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ru.process.platform.ProjectManagement.dto.filter.ProjectFilterRequestDto;
import ru.process.platform.ProjectManagement.entity.UserProject;

public interface UserProjectRepositoryCustom {

    Page<UserProject> findUserProjectByFilter(int userId, Pageable pageable, ProjectFilterRequestDto projectFilterRequestDto);
}
