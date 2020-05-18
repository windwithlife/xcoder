package com.simple.server.auto.service;

//import com.simple.server.auto.entity.ProjectRelease;
import com.simple.server.auto.dao.ApplicationReleaseRepository;
import com.simple.server.auto.entity.ApplicationRelease;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ApplicationReleaseService {
	@Autowired
	ApplicationReleaseRepository dao;
	public List<ApplicationRelease> findAll(){
		return  dao.findAll();
	}
	public  List<ApplicationRelease> findByName(String name){
		return dao.findByName(name);
	}
	public  List<ApplicationRelease> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public ApplicationRelease findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public ApplicationRelease findById(Long id){
		return dao.findById(id).get();
	}
	public ApplicationRelease save(ApplicationRelease item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.deleteById(id);
	}


                             
}
