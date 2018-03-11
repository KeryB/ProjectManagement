package ru.process.platform.ProjectManagement.repository.jdbcTemplate;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Getter
@Setter
public class Paging<T> {
    private Pageable pageable;
    private int totalPages;
    private long totalElements;

    public Paging(Pageable pageable, Page<T> page) {
        this.pageable = pageable;
        this.totalPages = page.getTotalPages();
        this.totalElements = page.getTotalElements();
    }

    public Paging(long totalElements) {
        this.totalElements = totalElements;
    }
}
