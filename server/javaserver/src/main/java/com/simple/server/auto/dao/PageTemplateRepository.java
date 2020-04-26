package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface PageTemplateRepository extends JpaRepository<PageTemplate, Long> {
    public  List<PageTemplate> findByName(String name);
    public  List<PageTemplate> findByNameLike(String name);

    public PageTemplate findOneByName(String name);

    
       public List<PageTemplate> findByStatus(Long id);

                   
}
