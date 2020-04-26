package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface ProjectReleaseRepository extends JpaRepository<ProjectRelease, Long> {
    public  List<ProjectRelease> findByName(String name);
    public  List<ProjectRelease> findByNameLike(String name);

    public ProjectRelease findOneByName(String name);
       //public List<ProjectRelease> findByRelaseId(Long id);


}
