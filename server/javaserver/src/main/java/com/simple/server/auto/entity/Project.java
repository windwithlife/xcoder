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
public class Project implements Serializable {
	private static final long serialVersionUID = 1L;

    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
           
    //名称
    private String name;
       
    //说明
    private String description;

    private Long status;
//    private Long channel;
        
    //站点
    private String website;
       
    //SOA地址
    private String soaIp;

//    //SOA地址
//    private String frontendLanguage;
//    private String frontendFramework;
//    private String frontendPlatform;
//
//    private String serverLanguage;
//    private String serverFramework;
//    private String serverPlatform;
//
//    private String  webLanguage;
//    private String webFramework;
//    private String webPlatform;

    @OneToMany(cascade=CascadeType.REMOVE,fetch=FetchType.LAZY)
    @JoinColumn(name="projectId")
    private List<Xmodule> modules;

    @OneToMany(cascade=CascadeType.REMOVE,fetch=FetchType.LAZY)
    @JoinColumn(name="projectId")
    private List<ProjectRelease> releases;

//    @OneToMany(cascade=CascadeType.REMOVE,fetch=FetchType.LAZY)
//    @JoinColumn(name="projectId")
//    private List<Xinterface> interfaces;
//
//    @OneToMany(cascade=CascadeType.REMOVE,fetch=FetchType.LAZY)
//    @JoinColumn(name="projectId")
//    private List<Xpage> pages;

    public Project() {
	}

    //编号
    public List<Xmodule> getModules(){
        return this.modules;
    };
    public void setModules(List<Xmodule> modules){
        this.modules = modules;
    }

    public List<ProjectRelease> getReleases(){
        return this.releases;
    };
    public void setReleases(List<ProjectRelease> releases){
        this.releases = releases;
    }

//    public List<Xinterface> getInterfaces(){
//        return this.interfaces;
//    };
//    public void setInterfaces(List<Xinterface> interfaces){
//        this.interfaces = interfaces;
//    }
//
//    public List<Xpage> getPages(){
//        return this.pages;
//    };
//    public void setPages(List<Xpage> pages){
//        this.pages = pages;
//    }
     //编号
     public Long getId(){
         return this.id;
     };
     public void setId(Long id){
         this.id = id;
     }

    public Long getStatus(){
        return this.status;
    };
    public void setStatus(Long status){
        this.status = status;
    }
//
//    //编号
//    public String getFrontendLanguage(){
//        return this.frontendLanguage;
//    };
//    public void setFrontendLanguage(String id){
//        this.frontendLanguage = id;
//    }
//
//    //编号
//    public String getFrontendFramework(){
//        return this.frontendFramework;
//    };
//    public void setFrontendFramework(String id){
//        this.frontendFramework = id;
//    }
//
//    //编号
//    public String getFrontendPlatform(){
//        return this.frontendPlatform;
//    };
//    public void setFrontendPlatform(String id){
//        this.frontendPlatform = id;
//    }

//    //后端编程语言
//    public String getServerLanguage(){
//        return this.serverLanguage;
//    };
//    public void setServerLanguage(String id){
//        this.serverLanguage = id;
//    }
//
//
//    //后端编程框架
//    public String getServerFramework(){
//        return this.serverFramework;
//    };
//    public void setServerFramework(String id){
//        this.serverFramework = id;
//    }
//
//    //后端编程框架
//    public String getServerPlatform(){
//        return this.serverFramework;
//    };
//    public void setServerPlatform(String name){
//        this.serverFramework = name;
//    }
//
//    //Web站点编程语言
//    public String getWebLanguage(){
//        return this.webLanguage;
//    };
//    public void setWebLanguage(String id){
//        this.webLanguage = id;
//    }
//
//
//    //Web编程框架
//    public String getWebFramework(){
//        return this.webFramework;
//    };
//    public void setWebFramework(String id){
//        this.webFramework = id;
//    }


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
     
//
//
//    public Long getChannel(){
//         return this.channel;
//    };
//    public void setChannel(Long channel){
//         this.channel = channel;
//    }
//

          
     //站点
     public String getWebsite(){
         return this.website;
     };
     public void setWebsite(String website){
         this.website = website;
     }
     
     //SOA地址
     public String getSoaIp(){
         return this.soaIp;
     };
     public void setSoaIp(String soaIp){
         this.soaIp = soaIp;
     }


	@Override
	public String toString() {
		return "CLASS DATA: [id=" + id +"]";
	}
}
