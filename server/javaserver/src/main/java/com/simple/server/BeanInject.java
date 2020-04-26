package com.simple.server;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class BeanInject {
    @Value("spring.datasource.url")
    private String another;

    public String getAnother() {
        return another;
    }
}

