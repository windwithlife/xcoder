package com.simple.server.auto.configure.dto;

import java.io.Serializable;

import com.simple.server.auto.configure.entity.*;

import java.util.List;
import java.util.ArrayList;

public class MenuRequest implements Serializable {
	private static final long serialVersionUID = 1L;

    
    private Long id;         
    
    private String name;         
    
    private int level;         
    
    private String path;         
    
    private String menuType;         
    
    private String moduleName;         
    

    public MenuRequest() {
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
    

  
}
