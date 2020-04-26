package com.simple.server.bz.entity;

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


import java.util.List;


@Entity
public class Indexfutures implements Serializable {
	private static final long serialVersionUID = 1L;

    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
           
    //名称
    private String name;
       
    //说明
    private String description;
       
    //期货月份
    private String vmonth;
       
    //前值
    private String vbefore;
       
    //最新的值
    private String vlast;
       
    //最高的值
    private String vhigh;
       
    //最低的值
    private String vlow;
       
    //值变化
    private String vchange;
       
    //值变化百分比
    private String vchangep;
       
    //值变化时间
    private String vtime;
       
    //当天技术分析
    private String tday;
       
    //本周技术分析
    private String tweek;
       
    //期货类型
    private String futureType;
       
    public Indexfutures() {
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
     public void setDescription(String description){
         this.description = description;
     }
     
     //期货月份
     public String getVmonth(){
         return this.vmonth;
     };
     public void setVmonth(String vmonth){
         this.vmonth = vmonth;
     }
     
     //前值
     public String getVbefore(){
         return this.vbefore;
     };
     public void setVbefore(String vbefore){
         this.vbefore = vbefore;
     }
     
     //最新的值
     public String getVlast(){
         return this.vlast;
     };
     public void setVlast(String vlast){
         this.vlast = vlast;
     }
     
     //最高的值
     public String getVhigh(){
         return this.vhigh;
     };
     public void setVhigh(String vhigh){
         this.vhigh = vhigh;
     }
     
     //最低的值
     public String getVlow(){
         return this.vlow;
     };
     public void setVlow(String vlow){
         this.vlow = vlow;
     }
     
     //值变化
     public String getVchange(){
         return this.vchange;
     };
     public void setVchange(String vchange){
         this.vchange = vchange;
     }
     
     //值变化百分比
     public String getVchangep(){
         return this.vchangep;
     };
     public void setVchangep(String vchangep){
         this.vchangep = vchangep;
     }
     
     //值变化时间
     public String getVtime(){
         return this.vtime;
     };
     public void setVtime(String vtime){
         this.vtime = vtime;
     }
     
     //当天技术分析
     public String getTday(){
         return this.tday;
     };
     public void setTday(String tday){
         this.tday = tday;
     }
     
     //本周技术分析
     public String getTweek(){
         return this.tweek;
     };
     public void setTweek(String tweek){
         this.tweek = tweek;
     }
     
     //期货类型
     public String getFutureType(){
         return this.futureType;
     };
     public void setFutureType(String futureType){
         this.futureType = futureType;
     }
     



	@Override
	public String toString() {
		return "CLASS DATA: [id=" + id +"]";
	}
}
