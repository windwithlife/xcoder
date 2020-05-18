package com.simple.server.auto.service;

import com.simple.server.auto.dao.ApplicationRepository;
import com.simple.server.auto.dao.ApplicationTypeRepository;
import com.simple.server.auto.entity.Application;
import com.simple.server.auto.entity.ApplicationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ApplicationTypeService {
	@Autowired
	ApplicationTypeRepository dao;

	public List<ApplicationType> findAll(){
		return  dao.findAll();
	}
	public  List<ApplicationType> findByName(String name){
		return dao.findByName(name);
	}
	public  List<ApplicationType> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public ApplicationType findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public ApplicationType findById(Long id){
		return dao.findById(id).get();
	}
	public ApplicationType save(ApplicationType item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.deleteById(id);
	}

}
