package com.simple.server.auto.dao;

import com.simple.server.auto.entity.Application;
import com.simple.server.auto.entity.ApplicationType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationTypeRepository extends JpaRepository<ApplicationType, Long> {
    public  List<ApplicationType> findByName(String name);
    public  List<ApplicationType> findByNameLike(String name);

    public ApplicationType findOneByName(String name);



}
