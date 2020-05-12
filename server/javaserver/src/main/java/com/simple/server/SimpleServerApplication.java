package com.simple.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationListener;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


//@EnableJpaAuditing

@SpringBootApplication(scanBasePackages="com.simple")
@EnableJpaRepositories("com.simple")
@EntityScan("com.simple.*")
@EnableFeignClients(basePackages = {"com.simple"})
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

