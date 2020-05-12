package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class XmoduleService {
	@Autowired
	XmoduleRepository dao;
	public List<Xmodule> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Xmodule> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Xmodule> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Xmodule findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Xmodule findById(Long id){
		return dao.findById(id).get();
	}

	public List<Xmodule> findByProjectId(Long id){
		return dao.findByProjectId(id);
	}
	public Xmodule save(Xmodule item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.deleteById(id);
	}


                             
}
