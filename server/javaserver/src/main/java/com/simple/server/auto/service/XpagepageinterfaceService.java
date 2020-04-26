package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class XpagepageinterfaceService {
	@Autowired
	XpagepageinterfaceRepository dao;
	public List<Xpagepageinterface> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Xpagepageinterface> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Xpagepageinterface> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Xpagepageinterface findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Xpagepageinterface findById(Long id){
		return dao.findOne(id);
	}
	public Xpagepageinterface save(Xpagepageinterface item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Xpagepageinterface> findByXpageId(Long id){
        return dao.findByXpageId(id);
    }

                             

    public  List<Xpagepageinterface> findByXpageName(Long id){
        return dao.findByXpageName(id);
    }

                             

    public  List<Xpagepageinterface> findByPageinterfaceId(Long id){
        return dao.findByPageinterfaceId(id);
    }

                             

    public  List<Xpagepageinterface> findByPageinterfaceName(Long id){
        return dao.findByPageinterfaceName(id);
    }

                             
}
