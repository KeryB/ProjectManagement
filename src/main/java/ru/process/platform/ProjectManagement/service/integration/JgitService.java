package ru.process.platform.ProjectManagement.service.integration;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;
import org.springframework.stereotype.Service;
import ru.process.platform.ProjectManagement.service.integration.git.GitHelper;

import java.io.File;
import java.io.IOException;

@Service
public class JgitService {


    public File createGitRepo() throws IOException, GitAPIException {
        File folder = new File("D:/ideaProjects/gitProjects/folder1");
        boolean mkdir = folder.mkdirs();
        Repository repository = GitHelper.openRepository(folder);
        System.out.println("Temporary repository at " + repository.getDirectory());

        // create the file
        File myfile = new File(repository.getDirectory().getParent(),
                "testfile.txt");
        myfile.createNewFile();

        // run the add-call
        Git git = new Git(repository);
        git.add().addFilepattern("testfile").call();

        // and then commit the changes
        git.commit().setMessage("Added testfile").call();

        System.out.println("Added file  to repository at " + repository.getDirectory());

        File dir = repository.getDirectory();

        return dir;
    }

    public Git openOrCreate( File gitDirectory ) throws IOException, GitAPIException {
        Git git;
        FileRepositoryBuilder repositoryBuilder = new FileRepositoryBuilder();
        repositoryBuilder.addCeilingDirectory( gitDirectory );
        repositoryBuilder.findGitDir( gitDirectory );
        if( repositoryBuilder.getGitDir() == null ) {
            git = Git.init().setDirectory( gitDirectory.getParentFile() ).call();
        } else {
            git = new Git( repositoryBuilder.build() );
        }

        Repository repository = git.getRepository();
        File myfile = new File(repository.getDirectory().getParent(), "testfile");
        myfile.createNewFile();
        return git;
    }
}
