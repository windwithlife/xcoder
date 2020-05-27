package com.simple.server.auto.configure.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.configure.entity.*;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    public  List<Menu> findByName(String name);
    public  List<Menu> findByNameLike(String name);

    public  Menu findOneByName(String name);
    public  Menu findOneById(Long id);

    
        
}
