package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface XpagepageinterfaceRepository extends JpaRepository<Xpagepageinterface, Long> {
    public  List<Xpagepageinterface> findByName(String name);
    public  List<Xpagepageinterface> findByNameLike(String name);

    public  Xpagepageinterface findOneByName(String name);

    
       public List<Xpagepageinterface> findByXpageId(Long id);

                   
       public List<Xpagepageinterface> findByXpageName(Long id);

                   
       public List<Xpagepageinterface> findByPageinterfaceId(Long id);

                   
       public List<Xpagepageinterface> findByPageinterfaceName(Long id);

                   
}
