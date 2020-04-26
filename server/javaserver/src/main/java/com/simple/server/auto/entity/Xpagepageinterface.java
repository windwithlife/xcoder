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
public class Xpagepageinterface implements Serializable {
	private static final long serialVersionUID = 1L;

    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
           
    //
    private String name;
       
    //
    private Long xpageId;
       
    //
    private String xpageName;
       
    //
    private Long pageinterfaceId;
       
    //
    private String pageinterfaceName;
       
    public Xpagepageinterface() {
	}
       
     //
     public Long getId(){
         return this.id;
     };
     public void setId(Long id){
         this.id = id;
     }
     
     //
     public String getName(){
         return this.name;
     };
     public void setName(String name){
         this.name = name;
     }
     
     //
     public Long getXpageId(){
         return this.xpageId;
     };
     public void setXpageId(Long xpageId){
         this.xpageId = xpageId;
     }
     
     //
     public String getXpageName(){
         return this.xpageName;
     };
     public void setXpageName(String xpageName){
         this.xpageName = xpageName;
     }
     
     //
     public Long getPageinterfaceId(){
         return this.pageinterfaceId;
     };
     public void setPageinterfaceId(Long pageinterfaceId){
         this.pageinterfaceId = pageinterfaceId;
     }
     
     //
     public String getPageinterfaceName(){
         return this.pageinterfaceName;
     };
     public void setPageinterfaceName(String pageinterfaceName){
         this.pageinterfaceName = pageinterfaceName;
     }
     



	@Override
	public String toString() {
		return "CLASS DATA: [id=" + id +"]";
	}
}
