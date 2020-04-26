package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class XpageService {
	@Autowired
	XpageRepository dao;
	public List<Xpage> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Xpage> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Xpage> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Xpage findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Xpage findById(Long id){
		return dao.findOne(id);
	}
	public Xpage save(Xpage item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Xpage> findByStatus(Long id){
        return dao.findByStatus(id);
    }

                             
}
