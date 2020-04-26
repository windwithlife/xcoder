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
public class Dictionary implements Serializable {
	private static final long serialVersionUID = 1L;

    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
           
    //显示名称
    private String name;
       
    //对应定义值
    private String value;

    //private String    strValue;
    //private int    intValue;


    private Long category;
        
    public Dictionary() {
	}
       
     //编号
     public Long getId(){
         return this.id;
     };
     public void setId(Long id){
         this.id = id;
     }
     
     //显示名称
     public String getName(){
         return this.name;
     };
     public void setName(String name){
         this.name = name;
     }
     
     //对应定义值
     public String getValue(){
         return this.value;
     };
     public void setValue(String value){
         this.value = value;
     }
     


    public Long getCategory(){
         return this.category;
    };
    public void setCategory(Long category){
         this.category = category;
    }


          



	@Override
	public String toString() {
		return "CLASS DATA: [id=" + id +"]";
	}
}
