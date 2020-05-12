package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;
import org.springframework.data.jpa.repository.Query;

public interface XtablecolumnRepository extends JpaRepository<Xtablecolumn, Long> {
    public  List<Xtablecolumn> findByName(String name);
    public  List<Xtablecolumn> findByNameLike(String name);

    public  Xtablecolumn findOneByName(String name);

       //@Query(value="SELECT * from Xtablecolumn where tableId=?1",nativeQuery=true)
       public List<Xtablecolumn> findByTableId(Long id);
       //public Xtablecolumn findById(Long id);
                   
       public List<Xtablecolumn> findByFieldType(Long id);

                   
       public List<Xtablecolumn> findByShowType(Long id);

                   
       public List<Xtablecolumn> findByMap(Long id);

                   
}
