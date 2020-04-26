package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class XtablecolumnService {
	@Autowired
	XtablecolumnRepository dao;
	public List<Xtablecolumn> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Xtablecolumn> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Xtablecolumn> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Xtablecolumn findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Xtablecolumn findById(Long id){
		return dao.findOne(id);
	}
	public Xtablecolumn save(Xtablecolumn item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	

    public  List<Xtablecolumn> findByTableId(Long id){
        return dao.findByTableId(id);
    }

                             

    public  List<Xtablecolumn> findByFieldType(Long id){
        return dao.findByFieldType(id);
    }

                             

    public  List<Xtablecolumn> findByShowType(Long id){
        return dao.findByShowType(id);
    }

                             

    public  List<Xtablecolumn> findByMap(Long id){
        return dao.findByMap(id);
    }

                             
}
