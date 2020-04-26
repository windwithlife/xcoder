package com.simple.core;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.web.servlet.ErrorPage;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.GzipResourceResolver;

@Configuration
public class WebMvcConfiguration extends WebMvcConfigurerAdapter {
	@Value("${upload.path}") 
	private String uploadPath;
	
	@Value("${simple.web.root}") 
	private String webroot;
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
	      registry.addResourceHandler("/images/**").addResourceLocations("file:" + uploadPath);
	      registry.addResourceHandler("/**").addResourceLocations("classpath:/public/").addResourceLocations("classpath:/static/").addResourceLocations("classpath:/META-INF/resources/").addResourceLocations("file:" + webroot).addResourceLocations("classpath:/auto/");
	      //.resourceChain(false).addResolver(new GzipResourceResolver());
	      
	      super.addResourceHandlers(registry);
	}
	
	@Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/**").allowedHeaders("*")
                .allowedMethods("*")
                .allowedOrigins("*");

    }

	@Bean
	public EmbeddedServletContainerCustomizer containerCustomizer() {
	    return new EmbeddedServletContainerCustomizer() {
	        @Override
	        public void customize(ConfigurableEmbeddedServletContainer container) {
	            container.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/404"));
	            container.addErrorPages(new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/500"));
	        }
	    };
	}
}
