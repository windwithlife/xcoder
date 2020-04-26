package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface XmoduleRepository extends JpaRepository<Xmodule, Long> {
    public  List<Xmodule> findByName(String name);
    public  List<Xmodule> findByNameLike(String name);

    public  Xmodule findOneByName(String name);
    public  List<Xmodule> findByProjectId(Long id);


}
