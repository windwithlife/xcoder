package com.simple.server.auto.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

//import com.simple.core.base.user.entity.*;


@Entity
public class ApplicationPoint implements Serializable {
	private static final long serialVersionUID = 1L;


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //名称
    private String name;
    //说明
    private String description;
    private String topicName;
    private String idString;
    private String pointAppType;
    private String serverAddress;
    private String serverAddressProd;


    public ApplicationPoint() {
    }

    //编号
    public Long getId(){
        return this.id;
    };
    public void setId(Long id){
        this.id = id;
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

    public String getTopicName(){
        return this.topicName;
    };
    public void setTopicName(String name){
        this.topicName = name;
    }

    //编号
    public String getIdString(){
        return this.idString;
    };
    public void setIdString(String idString){
        this.idString = idString;
    }

    //编号
    public String getPointAppType(){
        return this.pointAppType;
    };
    public void setPointAppType(String type){
        this.pointAppType = type;
    }
    //编号
    public String getServerAddress(){
        return this.serverAddress;
    };
    public void setServerAddress(String address){
        this.serverAddress = address;
    }

    //编号
    public String getServerAddressProd(){
        return this.serverAddressProd;
    };
    public void setServerAddressProd(String address){
        this.serverAddressProd = address;
    }

}
