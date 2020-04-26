package com.simple.server.auto.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;


@Entity
public class Xrelease implements Serializable {
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

    private String repository;
    private String repositoryBranch;
    private String releaseStatus;

    public Xrelease() {
    }

    //编号
    public Long getId(){
        return this.id;
    };
    public void setId(Long id){
        this.id = id;
    }

    //代码仓库
    public String getRepository(){
        return this.repository;
    };
    public void setRepository(String repo){
        this.repository= repo;
    }


    //代码仓库
    public String getRepositoryBranch(){
        return this.repositoryBranch;
    };
    public void setRepositoryBranch(String branch){
        this.repositoryBranch= branch;
    }


    //发布状态
    public String getReleaseStatus(){
        return this.releaseStatus;
    };
    public void setReleaseStatus(String status){
        this.releaseStatus= status;
    }

    //编程语言
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
    public void setDescription(String description) {
        this.description = description;
    }

	@Override
	public String toString() {
		return "CLASS DATA: [id=" + id +"]";
	}
}
