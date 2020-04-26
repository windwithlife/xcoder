package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface XpageRepository extends JpaRepository<Xpage, Long> {
    public  List<Xpage> findByName(String name);
    public  List<Xpage> findByNameLike(String name);

    public  Xpage findOneByName(String name);

    
       public List<Xpage> findByStatus(Long id);

                   
}
