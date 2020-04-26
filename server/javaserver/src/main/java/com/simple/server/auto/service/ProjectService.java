package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class ProjectService {
	@Autowired
	ProjectRepository dao;
	public List<Project> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Project> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Project> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Project findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Project findById(Long id){
		return dao.findOne(id);
	}
	public Project save(Project item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	
}
