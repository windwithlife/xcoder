package com.simple.server.auto.service;

import com.simple.server.auto.dao.ApplicationPointRepository;
import com.simple.server.auto.entity.ApplicationPoint;
//import com.simple.server.auto.entity.ApplicationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ApplicationPointService {
	@Autowired
	ApplicationPointRepository dao;

	public List<ApplicationPoint> findAll(){
		return  dao.findAll();
	}
	public  List<ApplicationPoint> findByName(String name){
		return dao.findByName(name);
	}
	public  List<ApplicationPoint> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public ApplicationPoint findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public ApplicationPoint findById(Long id){
		return dao.findById(id).get();
	}
	public ApplicationPoint save(ApplicationPoint item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.deleteById(id);
	}

}
