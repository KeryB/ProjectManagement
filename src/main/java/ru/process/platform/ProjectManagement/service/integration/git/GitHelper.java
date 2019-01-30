package ru.process.platform.ProjectManagement.service.integration.git;

import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;

import java.io.File;
import java.io.IOException;

public class GitHelper {

    public static Repository openRepository(File folder) throws IOException {
        FileRepositoryBuilder builder = new FileRepositoryBuilder();

        Repository repository = builder.setGitDir(new File(folder.getAbsolutePath()))
                .readEnvironment() // scan environment GIT_* variables
                .findGitDir() // scan up the file system tree
                .build();
        return repository;
    }

    public static Repository createNewRepository() throws IOException {
        // prepare a new folder
        File localPath = File.createTempFile("F:/repo", "");
        localPath.delete();

        // create the directory
        Repository repository = FileRepositoryBuilder.create(new File("F:/repo", ".git"));
        repository.create();

        return repository;
    }

//    public static Git openOrCreate(File gitDirectory ) throws IOException, GitAPIException {
//        Git git;
//        FileRepositoryBuilder repositoryBuilder = new FileRepositoryBuilder();
//        repositoryBuilder.addCeilingDirectory( gitDirectory );
//        repositoryBuilder.findGitDir( gitDirectory );
//        if( repositoryBuilder.getGitDir() == null ) {
//            git = Git.init().setDirectory( gitDirectory.getParentFile() ).call();
//        } else {
//            git = new Git( repositoryBuilder.build() );
//        }
//        return git;
//    }
}
