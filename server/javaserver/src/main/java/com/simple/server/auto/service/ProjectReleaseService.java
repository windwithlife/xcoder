package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class ProjectReleaseService {
	@Autowired
	ProjectReleaseRepository dao;
	public List<ProjectRelease> findAll(){
		return  dao.findAll();
	}
	public  List<ProjectRelease> findByName(String name){
		return dao.findByName(name);
	}
	public  List<ProjectRelease> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public ProjectRelease findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public ProjectRelease findById(Long id){
		return dao.findById(id).get();
	}
	public ProjectRelease save(ProjectRelease item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.deleteById(id);
	}

//    public  List<ProjectRelease> findByReleaseId(Long id){
//        return dao.findByRelaseId(id);
//    }



                             
}
