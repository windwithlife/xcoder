package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class XpagexinterfaceService {
	@Autowired
	XpagexinterfaceRepository dao;
	public List<Xpagexinterface> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Xpagexinterface> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Xpagexinterface> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Xpagexinterface findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Xpagexinterface findById(Long id){
		return dao.findOne(id);
	}
	public Xpagexinterface save(Xpagexinterface item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Xpagexinterface> findByXpageId(Long id){
        return dao.findByXpageId(id);
    }

                             

    public  List<Xpagexinterface> findByXpageName(Long id){
        return dao.findByXpageName(id);
    }

                             

    public  List<Xpagexinterface> findByXinterfaceId(Long id){
        return dao.findByXinterfaceId(id);
    }

                             

    public  List<Xpagexinterface> findByXinterfaceName(Long id){
        return dao.findByXinterfaceName(id);
    }

                             
}
