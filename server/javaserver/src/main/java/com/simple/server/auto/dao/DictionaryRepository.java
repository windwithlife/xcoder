package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface DictionaryRepository extends JpaRepository<Dictionary, Long> {
    public  List<Dictionary> findByName(String name);
    public  List<Dictionary> findByNameLike(String name);

    public  Dictionary findOneByName(String name);

    
       public List<Dictionary> findByCategory(Long id);

                   
}
