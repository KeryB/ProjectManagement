package ru.process.platform.ProjectManagement.repository.UserProject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import ru.process.platform.ProjectManagement.dto.filter.ProjectFilterRequestDto;
import ru.process.platform.ProjectManagement.entity.UserProject;
import ru.process.platform.ProjectManagement.entity.project.Project;
import ru.process.platform.ProjectManagement.utils.StringUtils;

import java.util.List;

@Repository
public class UserProjectRepositoryImpl implements UserProjectRepositoryCustom {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserProjectRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Page<UserProject> findUserProjectByFilter(int userId, Pageable pageable, ProjectFilterRequestDto filter) {

        StringBuilder query  = buildQuery(filter);

        if(StringUtils.isNotBlank(filter.getProjectName())) {
            query.append(" AND p.title LIKE ").append("'%").append(filter.getProjectName()).append("%'");
        }
        if(filter.getFetchTableType() == ProjectFilterRequestDto.FetchTableType.mine){
            query.append(" AND up.owner = true");
        } else if(filter.getFetchTableType() == ProjectFilterRequestDto.FetchTableType.finished){
//            query.append(" AND up.owner = true");
        }

        List<UserProject> queryList = jdbcTemplate.query(query.toString(), new BeanPropertyRowMapper<>(UserProject.class), userId);

        jdbcTemplate.query(query.toString(), (resultSet,i) -> {
            UserProject userProject = new UserProject();

            Project project = (new BeanPropertyRowMapper<>(Project.class)).mapRow(resultSet,i);

            String statement = resultSet.getString("primaryProject");
            boolean lead = resultSet.getBoolean("lead");
            return userProject;
        }, userId);


        return null;

    }

    private StringBuilder buildQuery(ProjectFilterRequestDto filter){
        StringBuilder stringBuilder = new StringBuilder("SELECT * FROM user_project up");
        if(StringUtils.isNotBlank(filter.getProjectName())){
            stringBuilder.append(" INNER JOIN project p ON up.project_id = p.id");
        }
        stringBuilder.append(" WHERE up.user_id = ?");
        return stringBuilder;
    }
}
