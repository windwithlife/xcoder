package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    public  List<Project> findByName(String name);
    public  List<Project> findByNameLike(String name);

    public  Project findOneByName(String name);

    
}
