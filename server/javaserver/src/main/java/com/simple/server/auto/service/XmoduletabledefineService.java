package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class XmoduletabledefineService {
	@Autowired
	XmoduletabledefineRepository dao;
	public List<Xmoduletabledefine> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Xmoduletabledefine> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Xmoduletabledefine> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Xmoduletabledefine findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Xmoduletabledefine findById(Long id){
		return dao.findOne(id);
	}
	public Xmoduletabledefine save(Xmoduletabledefine item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Xmoduletabledefine> findByXmoduleId(Long id){
        return dao.findByXmoduleId(id);
    }

                             

    public  List<Xmoduletabledefine> findByXmoduleName(Long id){
        return dao.findByXmoduleName(id);
    }

                             

    public  List<Xmoduletabledefine> findByTabledefineId(Long id){
        return dao.findByTabledefineId(id);
    }

                             

    public  List<Xmoduletabledefine> findByTabledefineName(Long id){
        return dao.findByTabledefineName(id);
    }

                             
}
