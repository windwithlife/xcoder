package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class XcomponentxinterfaceService {
	@Autowired
	XcomponentxinterfaceRepository dao;
	public List<Xcomponentxinterface> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Xcomponentxinterface> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Xcomponentxinterface> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Xcomponentxinterface findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Xcomponentxinterface findById(Long id){
		return dao.findOne(id);
	}
	public Xcomponentxinterface save(Xcomponentxinterface item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Xcomponentxinterface> findByXcomponentId(Long id){
        return dao.findByXcomponentId(id);
    }

                             

    public  List<Xcomponentxinterface> findByXcomponentName(Long id){
        return dao.findByXcomponentName(id);
    }

                             

    public  List<Xcomponentxinterface> findByXinterfaceId(Long id){
        return dao.findByXinterfaceId(id);
    }

                             

    public  List<Xcomponentxinterface> findByXinterfaceName(Long id){
        return dao.findByXinterfaceName(id);
    }

                             
}
