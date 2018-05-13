package ru.process.platform.ProjectManagement.service.integration;

import org.kohsuke.github.GitHub;

import javax.annotation.PostConstruct;
import java.io.IOException;

public class GithubIntegrationService {

    @PostConstruct
    public void getInstance(){

        try {
            GitHub gitHub = GitHub.connect();
//            gitHub.createOrGetAuth()
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
