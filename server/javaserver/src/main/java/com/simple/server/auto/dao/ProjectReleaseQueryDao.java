package com.simple.server.auto.dao;


import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.simple.server.auto.entity.*;


import java.util.List;

import org.apache.ibatis.annotations.*;



@Mapper
public interface ProjectReleaseQueryDao {

    @Select("SELECT * FROM Release WHERE NAME = #{name}")
    List<ProjectRelease> findByName(@Param("name") String name);

}