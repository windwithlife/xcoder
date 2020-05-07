package com.simple.server.auto.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;


@Entity
public class BuildRecord implements Serializable {
	private static final long serialVersionUID = 1L;


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //名称
    private String name;

    //说明
    private String description;

    private String buildNumber;
    private String releaseStatus;
    private String releaseVersion;

    public BuildRecord() {
    }

    //编号
    public Long getId(){
        return this.id;
    };
    public void setId(Long id){
        this.id = id;
    }

    //发布状态
    public String getReleaseStatus(){
        return this.releaseStatus;
    };
    public void setReleaseStatus(String status){
        this.releaseStatus= status;
    }

    public String getBuildNumber(){
        return this.buildNumber;
    };
    public void setBuildNumber(String number){
        this.buildNumber= number;
    }
    //发布状态
    public String getReleaseVersion(){
        return this.releaseVersion;
    };
    public void setReleaseVersion(String version){
        this.releaseVersion= version;
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


}
