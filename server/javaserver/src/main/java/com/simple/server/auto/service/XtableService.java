package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class XtableService {
	@Autowired
	XtableRepository dao;
	public List<Xtable> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Xtable> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Xtable> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Xtable findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Xtable findById(Long id){
		return dao.findById(id).get();
	}
	public Xtable save(Xtable item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.deleteById(id);
	}


	

    public  List<Xtable> findByStatus(Long id){
        return dao.findByStatus(id);
    }
	public  List<Xtable> findByModuleId(Long id){
		return dao.findByModuleId(id);
	}

                             
}
