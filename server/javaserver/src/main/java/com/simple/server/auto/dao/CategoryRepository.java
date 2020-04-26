package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    public  List<Category> findByName(String name);
    public  List<Category> findByNameLike(String name);

    public  Category findOneByName(String name);

    
}
