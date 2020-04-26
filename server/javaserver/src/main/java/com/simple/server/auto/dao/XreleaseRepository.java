package com.simple.server.auto.dao;

import com.simple.server.auto.entity.ProjectRelease;
import com.simple.server.auto.entity.Xrelease;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface XreleaseRepository extends JpaRepository<Xrelease, Long> {
    public  List<Xrelease> findByName(String name);
    public  List<Xrelease> findByNameLike(String name);

    public Xrelease findOneByName(String name);



}
