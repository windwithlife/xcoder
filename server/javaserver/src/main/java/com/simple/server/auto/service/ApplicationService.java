package com.simple.server.auto.service;

import com.simple.server.auto.dao.ApplicationRepository;
import com.simple.server.auto.entity.Application;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ApplicationService {
	@Autowired
	ApplicationRepository dao;
	public List<Application> findAll(){
		return  dao.findAll();
	}
	public  List<Application> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Application> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public Application findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Application findById(Long id){
		return dao.findById(id).get();
	}
	public Application save(Application item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.deleteById(id);
	}

}
