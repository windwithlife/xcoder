package com.simple.server.auto.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.simple.core.base.user.entity.*;
import com.simple.server.bz.entity.*;
import com.simple.server.auto.entity.*;

import java.util.List;


@Entity
public class Xmodule implements Serializable {
	private static final long serialVersionUID = 1L;

    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
           
    //名称
    private String name;
       
    //说明
    private String description;

    private Long projectId;

    private String sideType;
    private String language;
    private String framework;
    private String platform;

    @OneToMany(cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    @JoinColumn(name="moduleId")
    private List<Xtable> tables;
    @OneToMany(cascade=CascadeType.REMOVE,fetch=FetchType.LAZY)
    @JoinColumn(name="moduleId")
    private List<Xinterface> interfaces;

    @OneToMany(cascade=CascadeType.REMOVE,fetch=FetchType.LAZY)
    @JoinColumn(name="moduleId")
    private List<Xpage> pages;

    public Xmodule() {
	}
       
     //编号
     public Long getId(){
         return this.id;
     };
     public void setId(Long id){
         this.id = id;
     }

    //编号
    public List<Xtable> getTables(){
        return this.tables;
    };
    public void setTables(List<Xtable> tables){
        this.tables = tables;
    }

    public List<Xinterface> getInterfaces(){
        return this.interfaces;
    };
    public void setInterfaces(List<Xinterface> interfaces){
        this.interfaces = interfaces;
    }

    public List<Xpage> getPages(){
        return this.pages;
    };
    public void setPages(List<Xpage> pages){
        this.pages = pages;
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

    public Long getProjectId(){
        return this.projectId;
    };
    public void setProjectId(Long projectId){
        this.projectId = projectId;
    }
     //名称
     public String getName(){
         return this.name;
     };
     public void setName(String name){
         this.name = name;
     }
     
     //说明
     public String getDescription(){
         return this.description;
     };
     public void setDescription(String description){
         this.description = description;
     }
     


	@Override
	public String toString() {
		return "CLASS DATA: [id=" + id +"]";
	}
}
