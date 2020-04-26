package com.simple.server.bz.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.bz.entity.*;

public interface IndexfuturesRepository extends JpaRepository<Indexfutures, Long> {
    public  List<Indexfutures> findByName(String name);
    public  List<Indexfutures> findByNameLike(String name);

    public  Indexfutures findOneByName(String name);

    
}
