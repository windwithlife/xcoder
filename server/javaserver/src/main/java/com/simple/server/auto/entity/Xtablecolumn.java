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
import javax.persistence.Transient;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.simple.core.base.user.entity.*;
import com.simple.server.bz.entity.*;
import com.simple.server.auto.entity.*;

import java.util.List;


@Entity
public class Xtablecolumn implements Serializable {
	private static final long serialVersionUID = 1L;

    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
           
    //列名称
    private String name;
       
    //表说明
    private String description;


    //@Transient
    private Long tableId;
    //private Long projectId;
//    @ManyToOne(fetch = FetchType.LAZY,optional=false)
//    @JoinColumn(name="table_id")//设置在表中的关联字段(外键)
//
//    @JsonIgnore
//    private Xtable table;
//

    private String fieldType;
        

    private Long showType;
        
    //关联表
    private String referModule;

    private String choose;

    private Long map;
        
    //关联字段
    private String mapField;
       
    public Xtablecolumn() {
	}
       
     //编号
     public Long getId(){
         return this.id;
     };
     public void setId(Long id){
         this.id = id;
     }
     
     //列名称
     public String getName(){
         return this.name;
     };
     public void setName(String name){
         this.name = name;
     }

    //列名称
    public String getChoose(){
        return this.choose;
    };
    public void setChoose(String chooseType){
        this.choose = chooseType;
    }
     
     //表说明
     public String getDescription(){
         return this.description;
     };
     public void setDescription(String description){
         this.description = description;
     }



    public Long getTableId(){
         return this.tableId;
    };
    public void setTableId(Long id){
         this.tableId = id;
    }


          


    public String getFieldType(){
         return this.fieldType;
    };
    public void setFieldType(String fieldType){
         this.fieldType = fieldType;
    }


          


    public Long getShowType(){
         return this.showType;
    };
    public void setShowType(Long showType){
         this.showType = showType;
    }


          
     //关联表
     public String getReferModule(){
         return this.referModule;
     };
     public void setReferModule(String referModule){
         this.referModule = referModule;
     }
     


    public Long getMap(){
         return this.map;
    };
    public void setMap(Long map){
         this.map = map;
    }


          
     //关联字段
     public String getMapField(){
         return this.mapField;
     };
     public void setMapField(String mapField){
         this.mapField = mapField;
     }
     



	@Override
	public String toString() {
		return "CLASS DATA: [id=" + id +"]";
	}
}
