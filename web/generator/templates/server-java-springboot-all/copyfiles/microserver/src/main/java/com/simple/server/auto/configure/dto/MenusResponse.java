package com.simple.server.auto.configure.dto;

import java.io.Serializable;

import com.simple.server.auto.configure.entity.*;

import java.util.List;
import java.util.ArrayList;

public class MenusResponse implements Serializable {
	private static final long serialVersionUID = 1L;

    
    private int itemsCount;         
    
    private List<MenuResponse> items;         
    

    public MenusResponse() {
    } 
   


    
       
    public int getItemsCount(){
        return this.itemsCount;
    }   
    public void setItemsCount(int itemsCount){
        this.itemsCount = itemsCount;
    }        
    
       
    public List<MenuResponse> getItems(){
        return this.items;
    }   
    public void setItems(List<MenuResponse> items){
        this.items = items;
    }        
    

  
}
