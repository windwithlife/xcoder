package com.simple.server.bz.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.bz.dao.*;
import com.simple.server.bz.entity.*;


@Service
public class IndexfuturesService {
	@Autowired
	IndexfuturesRepository dao;
	public List<Indexfutures> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Indexfutures> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Indexfutures> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Indexfutures findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Indexfutures findById(Long id){
		return dao.findOne(id);
	}
	public Indexfutures save(Indexfutures item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	
}
