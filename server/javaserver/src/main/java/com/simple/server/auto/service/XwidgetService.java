package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class XwidgetService {
	@Autowired
	XwidgetRepository dao;
	public List<Xwidget> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Xwidget> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Xwidget> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public Xwidget findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Xwidget findById(Long id){
		return dao.findOne(id);
	}
	public Xwidget save(Xwidget item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Xwidget> findByStatus(Long id){
        return dao.findByStatus(id);
    }

                             
}
