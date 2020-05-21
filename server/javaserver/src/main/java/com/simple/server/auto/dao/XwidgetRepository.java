package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface XwidgetRepository extends JpaRepository<Xwidget, Long> {
    public  List<Xwidget> findByName(String name);
    public  List<Xwidget> findByNameLike(String name);

    public Xwidget findOneByName(String name);

    
       public List<Xwidget> findByStatus(Long id);
    public List<Xwidget> findByApplicationTypeId(Long id);

                   
}
