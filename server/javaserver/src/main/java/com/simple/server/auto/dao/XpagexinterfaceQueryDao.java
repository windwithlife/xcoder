package com.simple.server.auto.dao;


import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.simple.core.base.user.entity.User;
import com.simple.server.bz.entity.*;
import com.simple.server.auto.entity.*;


import java.util.List;

import org.apache.ibatis.annotations.*;



@Mapper
public interface XpagexinterfaceQueryDao {

    @Select("SELECT * FROM Xpagexinterface WHERE NAME = #{name}")
    List<Xpagexinterface> findByName(@Param("name") String name);

}