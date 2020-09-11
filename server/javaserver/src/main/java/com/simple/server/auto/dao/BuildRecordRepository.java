package com.simple.server.auto.dao;

import com.simple.server.auto.entity.ApplicationPoint;
import com.simple.server.auto.entity.BuildRecord;
import com.simple.server.auto.entity.Xmodule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BuildRecordRepository extends JpaRepository<BuildRecord, Long> {
    public  List<BuildRecord> findByName(String name);
    public  List<BuildRecord> findByNameLike(String name);

    public BuildRecord findOneByName(String name);
    public  List<BuildRecord> findByApplicationReleaseId(Long id);



}
