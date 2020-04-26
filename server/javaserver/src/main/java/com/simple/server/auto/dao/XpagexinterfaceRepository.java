package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface XpagexinterfaceRepository extends JpaRepository<Xpagexinterface, Long> {
    public  List<Xpagexinterface> findByName(String name);
    public  List<Xpagexinterface> findByNameLike(String name);

    public  Xpagexinterface findOneByName(String name);

    
       public List<Xpagexinterface> findByXpageId(Long id);

                   
       public List<Xpagexinterface> findByXpageName(Long id);

                   
       public List<Xpagexinterface> findByXinterfaceId(Long id);

                   
       public List<Xpagexinterface> findByXinterfaceName(Long id);

                   
}
