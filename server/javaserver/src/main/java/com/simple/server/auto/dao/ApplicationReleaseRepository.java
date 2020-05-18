package com.simple.server.auto.dao;

import com.simple.server.auto.entity.ApplicationRelease;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationReleaseRepository extends JpaRepository<ApplicationRelease, Long> {
    public  List<ApplicationRelease> findByName(String name);
    public  List<ApplicationRelease> findByNameLike(String name);

    public ApplicationRelease findOneByName(String name);



}
