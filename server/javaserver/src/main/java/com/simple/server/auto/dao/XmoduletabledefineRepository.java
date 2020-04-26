package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface XmoduletabledefineRepository extends JpaRepository<Xmoduletabledefine, Long> {
    public  List<Xmoduletabledefine> findByName(String name);
    public  List<Xmoduletabledefine> findByNameLike(String name);

    public  Xmoduletabledefine findOneByName(String name);

    
       public List<Xmoduletabledefine> findByXmoduleId(Long id);

                   
       public List<Xmoduletabledefine> findByXmoduleName(Long id);

                   
       public List<Xmoduletabledefine> findByTabledefineId(Long id);

                   
       public List<Xmoduletabledefine> findByTabledefineName(Long id);

                   
}
