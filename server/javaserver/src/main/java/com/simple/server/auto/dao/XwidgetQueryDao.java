package com.simple.server.auto.dao;


import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.simple.server.auto.entity.*;


import java.util.List;

import org.apache.ibatis.annotations.*;



@Mapper
public interface XwidgetQueryDao {

    @Select("SELECT * FROM Pxinterface WHERE NAME = #{name}")
    List<Xwidget> findByName(@Param("name") String name);

}