package com.simple.server.auto.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

//import com.simple.core.base.user.entity.*;


@Entity
public class ApplicationType implements Serializable {
	private static final long serialVersionUID = 1L;


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    //名称
    private String name;
    //说明
    private String description;
    private String nickname;
    private String sideType;
    private String language;
    private String framework;
    private String platform;
    private int    isLib;


    public ApplicationType() {
    }

    //编号
    public Long getId(){
        return this.id;
    };
    public void setId(Long id){
        this.id = id;
    }

    public int getIsLib(){
        return this.isLib;
    };
    public void setIsLib(int isLib){
        this.isLib = isLib;
    }
    //名称
    public String getName(){
        return this.name;
    };
    public void setName(String name){
        this.name = name;
    }


    public String getNickname(){
        return this.nickname;
    };
    public void setNickname(String name){
        this.nickname = name;
    }
    //编号
    public String getLanguage(){
        return this.language;
    };
    public void setLanguage(String lan){
        this.language = lan;
    }

    //编号
    public String getSideType(){
        return this.sideType;
    };
    public void setSideType(String side){
        this.sideType = side;
    }
    //编号
    public String getFramework(){
        return this.framework;
    };
    public void setFramework(String framework){
        this.framework = framework;
    }

    //编号
    public String getPlatform(){
        return this.platform;
    };
    public void setPlatform(String platform){ this.platform = platform;}

    //说明
    public String getDescription(){
        return this.description;
    };
    public void setDescription(String description) {
        this.description = description;
    }

	@Override
	public String toString() {
		return "CLASS DATA: [id=" + id +"]";
	}
}
