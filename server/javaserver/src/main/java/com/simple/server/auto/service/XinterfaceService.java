package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class XinterfaceService {
	@Autowired
	XinterfaceRepository dao;
	public List<Xinterface> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Xinterface> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Xinterface> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Xinterface findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public List<Xinterface> findByModuleId(Long id){
		return dao.findByModuleId(id);
	}
	public Xinterface findById(Long id){
		return dao.findOne(id);
	}
	public Xinterface save(Xinterface item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Xinterface> findByStatus(Long id){
        return dao.findByStatus(id);
    }

                             
}
