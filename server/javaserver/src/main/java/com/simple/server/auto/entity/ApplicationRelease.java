package com.simple.server.auto.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;


@Entity
public class ApplicationRelease implements Serializable {
	private static final long serialVersionUID = 1L;


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //名称
    private String name;

    //说明
    private String description;

    private Long projectId;

//    private String sideType;
//    private String language;
//    private String framework;
//    private String platform;

    private Long applicationTypeId;
    private Long applicationPointId;

    private String path;
    private String repository;
    private String repositoryBranch;
    private String targetPath;
    private String releaseStatus;
    private int    useOwnDeploymentFile;
    private String releaseVersion;
    private String applicationName;
    private String domainName;
    private String domainNameUAT;


    public ApplicationRelease() {
    }

    //编号
    public Long getId(){
        return this.id;
    };
    public void setId(Long id){
        this.id = id;
    }

    public int getUseOwnDeploymentFile(){
        return this.useOwnDeploymentFile;
    };
    public void setUseOwnDeploymentFile(int isUse){
        this.useOwnDeploymentFile = isUse;
    }

    public String getPath(){
        return this.path;
    };
    public void setPath(String path){
        this.path = path;
    }
    //代码仓库
    public String getRepository(){
        return this.repository;
    };
    public void setRepository(String repo){
        this.repository= repo;
    }

    public String getTargetPath(){
        return this.targetPath;
    };
    public void setTargetPath(String path){
        this.targetPath = path;
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

    //发布状态
    public String getReleaseVersion(){
        return this.releaseVersion;
    };
    public void setReleaseVersion(String version){
        this.releaseVersion= version;
    }

    public Long getApplicationTypeId(){
        return this.applicationTypeId;
    };
    public void setApplicationTypeId(Long id){
        this.applicationTypeId = id;
    }

    public Long getApplicationPointId(){
        return this.applicationPointId;
    };
    public void setApplicationPointId(Long id){
        this.applicationPointId = id;
    }
//    //编程语言
//    public String getLanguage(){
//        return this.language;
//    };
//    public void setLanguage(String lan){
//        this.language = lan;
//    }
//
//    //编号
//    public String getSideType(){
//        return this.sideType;
//    };
//    public void setSideType(String side){
//        this.sideType = side;
//    }
//    //编号
//    public String getFramework(){
//        return this.framework;
//    };
//    public void setFramework(String framework){
//        this.framework = framework;
//    }
//
//    //编号
//    public String getPlatform(){
//        return this.platform;
//    };
//    public void setPlatform(String platform){ this.platform = platform;}

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

    //域名称
    public String getDomainName(){
        return this.domainName;
    };
    public void setDomainName(String name){
        this.domainName = name;
    }

    //域名称
    public String getDomainNameUAT(){
        return this.domainNameUAT;
    };
    public void setDomainNameUAT(String name){
        this.domainNameUAT = name;
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
