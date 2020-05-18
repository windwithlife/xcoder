package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    public  List<Application> findByName(String name);
    public  List<Application> findByNameLike(String name);

    public Application findOneByName(String name);



}
