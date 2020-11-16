package com.simple.bz.dao;

import com.simple.bz.model.ApplicationReleaseModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationReleaseRepository extends JpaRepository<ApplicationReleaseModel, Long> {
    public List<ApplicationReleaseModel> findByName(String name);
    public  List<ApplicationReleaseModel> findByApplicationId(Long id);
    public  List<ApplicationReleaseModel> findByApplicationIdAndEnvType(Long id, String envType);



}
