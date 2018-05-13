package ru.process.platform.ProjectManagement.service.integration;

import org.gitlab4j.api.GitLabApi;
import org.gitlab4j.api.GitLabApiException;
import org.gitlab4j.api.ProjectApi;
import org.gitlab4j.api.models.Project;

import javax.annotation.PostConstruct;
import java.util.List;


public class GitLabIntegrationService {

    private String token = "d1e33be20f2059833459a6b30d99af546a4c4220124846632a9b1c3127cd6bbe";

    @PostConstruct
    public void getInstance() {

        GitLabApi gitLabApi = null;
        try {
            gitLabApi = GitLabApi.oauth2Login("https://gitlab.com", "bulychevkery", "Voka80472011981");
            gitLabApi.setIgnoreCertificateErrors(true);
            ProjectApi projectApi = gitLabApi.getProjectApi();
            Project project1 = projectApi.getProject("filmtoolz-projects", "filmtoolz-commons-web");
            List<Project> memberProjects = projectApi.getMemberProjects();
            Project project = projectApi.getProject("https://gitlab.com/chrom/", "external-webrtc");
            System.out.println(project.getName());
        } catch (GitLabApiException e) {
            e.printStackTrace();
        }

    }
}
