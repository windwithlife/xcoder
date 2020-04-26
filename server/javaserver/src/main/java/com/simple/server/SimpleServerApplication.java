package com.simple.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
//import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;


//@EnableJpaAuditing

@SpringBootApplication(scanBasePackages="com.simple")
//@EnableScheduling
@EnableJpaRepositories("com.simple")
//@EnableMongoRepositories("com.simple")
@EntityScan("com.simple.*") 
public class SimpleServerApplication implements ApplicationListener<ContextRefreshedEvent>{

    @Autowired
    private BeanInject test;

	public static void main(String[] args) {

		SpringApplication.run(SimpleServerApplication.class, args);
	}

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        System.out.println(test.getAnother());
    }
}

