package com.simple.server.auto.dao;


import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.simple.server.auto.entity.*;


import java.util.List;

import org.apache.ibatis.annotations.*;



@Mapper
public interface PageTemplateQueryDao {

    @Select("SELECT * FROM Pxpage WHERE NAME = #{name}")
    List<PageTemplate> findByName(@Param("name") String name);

}