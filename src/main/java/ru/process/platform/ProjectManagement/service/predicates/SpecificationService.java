package ru.process.platform.ProjectManagement.service.predicates;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import ru.process.platform.ProjectManagement.dto.filter.ProjectFilterRequestDto;
import ru.process.platform.ProjectManagement.entity.UserProject;
import ru.process.platform.ProjectManagement.utils.StringUtils;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

@Service
public class SpecificationService {

    public Specification<UserProject> getProjectSpecification(int userId,ProjectFilterRequestDto filter){
        return ((root, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(criteriaBuilder.equal(root.get("primaryUser").get("id"), userId));

            if(StringUtils.isNotBlank(filter.getProjectName())){
                predicates.add(criteriaBuilder.like(root.get("primaryProject").get("title"), "%" + filter.getProjectName() + "%"));
            }

            if(filter.getFetchTableType() == ProjectFilterRequestDto.FetchTableType.mine){
                predicates.add(criteriaBuilder.equal(root.get("owner"), true));
            }

            Predicate[] array = new Predicate[predicates.size()];
            predicates.toArray(array);
            return criteriaBuilder.and(array);
        });
    }

    public Specification<UserProject> getProjectLeadSpecification(int projectId){
        return ((root, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(criteriaBuilder.equal(root.get("primaryProject").get("id"), projectId));
            predicates.add(criteriaBuilder.equal(root.get("lead"), true));

            Predicate[] array = new Predicate[predicates.size()];
            predicates.toArray(array);
            return criteriaBuilder.and(array);
        });
    }
}
