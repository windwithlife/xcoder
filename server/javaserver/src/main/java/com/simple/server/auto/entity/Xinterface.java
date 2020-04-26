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

import com.simple.core.base.user.entity.*;
import com.simple.server.bz.entity.*;
import com.simple.server.auto.entity.*;

import java.util.List;


@Entity
public class Xinterface implements Serializable {
	private static final long serialVersionUID = 1L;

    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
           
    //名称
    private String name;

    private String requestMethod;
    //说明
    private String description;
       
    private String domain;

    private Long domainId;

    @Column(columnDefinition="text")
    private String inputParams;

    @Column(columnDefinition="text")
    private String outputParams;

    @Column(columnDefinition="text")
    private String customSql;

    private Long status;
    //private Long projectId;
    private Long moduleId;



    public Xinterface() {
	}


     //编号
     public Long getId(){
         return this.id;
     };
     public void setId(Long id){
         this.id = id;
     }

     public Long getDomainId(){
         return this.domainId;
     }
     public void setDomainId(Long id){
         this.domainId = id;
     }
//    public Long getProjectId(){
//        return this.projectId;
//    };
//    public void setProjectId(Long projectId){
//        this.projectId = projectId;
//    }
    public Long getModuleId(){
        return this.moduleId;
    };
    public void setModuleId(Long id){
        this.moduleId = id;
    }
     //名称
     public String getDomain(){
         return this.domain;
     };
     public void setDomain(String name){
         this.domain = name;
     }

    //名称
    public String getName(){
        return this.name;
    };
    public void setName(String name){
        this.name = name;
    }

    //名称
    public String getRequestMethod(){
        return this.requestMethod;
    };
    public void setRequestMethod(String requestMethod){
        this.requestMethod = requestMethod;
    }


    //说明
     public String getDescription(){
         return this.description;
     };
     public void setDescription(String description){
         this.description = description;
     }
     
     //入参定义
     public String getOutputParams(){
         return this.outputParams;
     };
     public void setOutputParams(String params){
         this.outputParams = params;
     }
    //入参定义
    public String getInputParams(){
        return this.inputParams;
    };
    public void setInputParams(String params){
        this.inputParams = params;
    }


    //入参定义
    public String getCustomSql(){
        return this.customSql;
    };
    public void setCustomSql(String customSql){
        this.customSql = customSql;
    }

    public Long getStatus(){
         return this.status;
    };
    public void setStatus(Long status){
         this.status = status;
    }


          



	@Override
	public String toString() {
		return "CLASS DATA: [id=" + id +"]";
	}
}
