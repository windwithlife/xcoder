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
public class Xpage implements Serializable {
	private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
           
    //名称
    private String name;

    private String pageCategory;
       
    //说明
    private String description;


    //private Long interfaces;
        

    @Column(columnDefinition="text")
    private String defineText;


    @ManyToMany
    @JoinTable(name = "page_interface",joinColumns = @JoinColumn(name = "page_id"),
            inverseJoinColumns = @JoinColumn(name = "interface_id"))
    private List<Xinterface> interfaces;


    @ManyToMany
    @JoinTable(name = "page_widget",joinColumns = @JoinColumn(name = "page_id"),
            inverseJoinColumns = @JoinColumn(name = "widget_id"))
    private List<Xwidget> widgets;

    private Long status;

    private Long releaseId;

    public Xpage() {
	}

    public Long getReleaseId(){
        return this.releaseId;
    };
    public void setReleaseId(Long id){
        this.releaseId = id;
    }

    //编号
     public Long getId(){
         return this.id;
     };
     public void setId(Long id){
         this.id = id;
     }

//
//    public Long getProjectId(){
//        return this.projectId;
//    };
//    public void setProjectId(Long projectId){
//        this.projectId = projectId;
//    }


    //名称
    public String getPageCategory(){
        return this.pageCategory;
    };
    public void setPageCategory(String name){
        this.pageCategory= name;
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
     


    public List<Xinterface> getInterfaces(){
         return this.interfaces;
    };
    public void setInterfaces(List<Xinterface> interfaces){
         this.interfaces = interfaces;
    }



    public List<Xwidget> getWidgets(){
        return this.widgets;
    };
    public void setWidgets(List<Xwidget> widgets){
        this.widgets = widgets;
    }


    //页面代码
     public String getDefineText(){
         return this.defineText;
     };
     public void setDefineText(String defineText){
         this.defineText = defineText;
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
