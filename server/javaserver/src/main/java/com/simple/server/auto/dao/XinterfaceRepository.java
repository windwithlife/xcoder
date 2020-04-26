package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface XinterfaceRepository extends JpaRepository<Xinterface, Long> {
    public  List<Xinterface> findByName(String name);
    public  List<Xinterface> findByNameLike(String name);

    public  Xinterface findOneByName(String name);
    public   List<Xinterface> findByModuleId(Long id);

    
       public List<Xinterface> findByStatus(Long id);

                   
}
