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

//import com.simple.core.base.user.entity.*;
import com.simple.server.bz.entity.*;
import com.simple.server.auto.entity.*;

import java.util.List;


@Entity
public class ProjectRelease implements Serializable {
	private static final long serialVersionUID = 1L;

    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //名称
    private String name;

    //说明
    private String description;

    private Long projectId;
    private Long moduleId;
    private String applicationName;
    private String path;
    private String sideType;
    private String language;
    private String framework;
    private String platform;

    @OneToMany(cascade=CascadeType.REMOVE,fetch=FetchType.LAZY)
    @JoinColumn(name="releaseId")
    private List<Xpage> pages;

//    @ManyToMany
//    @JoinTable(name = "release_module",joinColumns = @JoinColumn(name = "releaseId"),
//            inverseJoinColumns = @JoinColumn(name = "moduleId"))
//    private List<Xmodule> modules;

    public ProjectRelease() {
    }

    //编号
    public Long getId(){
        return this.id;
    };
    public void setId(Long id){
        this.id = id;
    }

    public Long getModuleId(){
        return this.moduleId;
    };
    public void setModuleId(Long id){
        this.moduleId = id;
    }

    public List<Xpage> getPages(){
        return this.pages;
    };
    public void setPages(List<Xpage> pages){
        this.pages = pages;
    }

//    public List<Xmodule> getModules(){
//        return this.modules;
//    };
//    public void setModules(List<Xmodule> modules){
//        this.modules = modules;
//    }

    public String getPath(){
        return this.path;
    };
    public void setPath(String path){
        this.path = path;
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

    //名称
    public String getApplicationName(){
        return this.applicationName;
    };
    public void setApplicationName(String name){
        this.applicationName = name;
    }
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
