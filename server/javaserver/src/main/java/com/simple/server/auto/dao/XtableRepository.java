package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface XtableRepository extends JpaRepository<Xtable, Long> {
    public  List<Xtable> findByName(String name);
    public  List<Xtable> findByNameLike(String name);

    public  Xtable findOneByName(String name);

    
       public List<Xtable> findByStatus(Long id);
       public List<Xtable> findByModuleId(Long id);

                   
}
