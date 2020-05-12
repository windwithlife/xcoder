package com.simple.server.auto.configure.entity;

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


import com.simple.server.auto.configure.entity.*;

import java.util.List;

@Entity
public class Menu implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;  
    
    private String name; 
        
    
    private int level; 
        
    
    private String path; 
        
    
    private String menuType; 
        
    
    private String moduleName; 
        
    

    public Menu() {
    }
    
    
    public Long getId(){
        return this.id;
    }   
    public void setId(Long id){
        this.id = id;
    } 
    
    public String getName(){
        return this.name;
    }   
    public void setName(String name){
        this.name = name;
    } 
    
    public int getLevel(){
        return this.level;
    }   
    public void setLevel(int level){
        this.level = level;
    } 
    
    public String getPath(){
        return this.path;
    }   
    public void setPath(String path){
        this.path = path;
    } 
    
    public String getMenuType(){
        return this.menuType;
    }   
    public void setMenuType(String menuType){
        this.menuType = menuType;
    } 
    
    public String getModuleName(){
        return this.moduleName;
    }   
    public void setModuleName(String moduleName){
        this.moduleName = moduleName;
    } 
    
      
	@Override
	public String toString() {
		return "CLASS DATA: [" +"id=" + this.id +"name="+ this.name +"]";
	}
}
