package com.simple.server.auto.service;

import com.simple.server.auto.dao.ApplicationPointRepository;
import com.simple.server.auto.dao.BuildRecordRepository;
import com.simple.server.auto.entity.ApplicationPoint;
import com.simple.server.auto.entity.BuildRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//import com.simple.server.auto.entity.ApplicationType;


@Service
public class BuildRecordService {
	@Autowired
	BuildRecordRepository dao;

	public List<BuildRecord> findAll(){
		return  dao.findAll();
	}
	public  List<BuildRecord> findByName(String name){
		return dao.findByName(name);
	}
	public  List<BuildRecord> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }
	public  List<BuildRecord> findByApplicationReleaseId(Long id){
		return dao.findByApplicationReleaseId(id);
	}

	public BuildRecord findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public BuildRecord findById(Long id){
		return dao.findById(id).get();
	}
	public BuildRecord save(BuildRecord item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.deleteById(id);
	}



}
