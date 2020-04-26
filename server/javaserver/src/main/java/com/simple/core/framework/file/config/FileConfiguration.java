package com.simple.core.framework.file.config;

import javax.servlet.MultipartConfigElement;

import org.springframework.boot.context.embedded.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FileConfiguration {
	 @SuppressWarnings("deprecation")
		@Bean
		    public MultipartConfigElement multipartConfigElement() {
		        MultipartConfigFactory factory = new MultipartConfigFactory();
		        //factory.setLocation("simple-base/images");
		        factory.setMaxFileSize("2048KB");
		        factory.setMaxRequestSize("2048KB");
		        return factory.createMultipartConfig();
		    }
		

}
