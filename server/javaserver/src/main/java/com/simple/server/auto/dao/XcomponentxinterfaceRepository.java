package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface XcomponentxinterfaceRepository extends JpaRepository<Xcomponentxinterface, Long> {
    public  List<Xcomponentxinterface> findByName(String name);
    public  List<Xcomponentxinterface> findByNameLike(String name);

    public  Xcomponentxinterface findOneByName(String name);

    
       public List<Xcomponentxinterface> findByXcomponentId(Long id);

                   
       public List<Xcomponentxinterface> findByXcomponentName(Long id);

                   
       public List<Xcomponentxinterface> findByXinterfaceId(Long id);

                   
       public List<Xcomponentxinterface> findByXinterfaceName(Long id);

                   
}
