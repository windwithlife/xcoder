package com.simple.server.auto.dao;

import com.simple.server.auto.entity.ApplicationPoint;
import com.simple.server.auto.entity.ApplicationPoint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationPointRepository extends JpaRepository<ApplicationPoint, Long> {
    public  List<ApplicationPoint> findByName(String name);
    public  List<ApplicationPoint> findByNameLike(String name);

    public ApplicationPoint findOneByName(String name);



}
