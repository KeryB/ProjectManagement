package ru.process.platform.ProjectManagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import ru.process.platform.ProjectManagement.ws.config.MappedUserHandlerMethodArgumentResolver;

import java.util.List;

@SpringBootApplication
public class ProjectManagementApplication extends WebMvcConfigurerAdapter {

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder (){
		return new BCryptPasswordEncoder();
	}

	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
		argumentResolvers.add(new MappedUserHandlerMethodArgumentResolver());
	}

	public static void main(String[] args) {
		SpringApplication.run(ProjectManagementApplication.class, args);
	}

}
