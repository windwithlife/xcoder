package com.simple.server.auto.service;

import com.simple.server.auto.dao.ProjectReleaseRepository;
//import com.simple.server.auto.entity.ProjectRelease;
import com.simple.server.auto.dao.XreleaseRepository;
import com.simple.server.auto.entity.Xrelease;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class XreleaseService {
	@Autowired
	XreleaseRepository dao;
	public List<Xrelease> findAll(){
		return  dao.findAll();
	}
	public  List<Xrelease> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Xrelease> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public Xrelease findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Xrelease findById(Long id){
		return dao.findOne(id);
	}
	public Xrelease save(Xrelease item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}

//    public  List<ProjectRelease> findByReleaseId(Long id){
//        return dao.findByRelaseId(id);
//    }



                             
}
