package com.simple.server.auto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.server.auto.dao.*;
import com.simple.server.auto.entity.*;


@Service
public class CategoryService {
	@Autowired
	CategoryRepository dao;
	public List<Category> findAll(){
		return  dao.findAll();
		//return items;
	}
	public  List<Category> findByName(String name){
		return dao.findByName(name);
	}
	public  List<Category> findByNameLike(String name){
    		return dao.findByNameLike(name);
    }

	public  Category findOneByName(String name){
    		return dao.findOneByName(name);
    	}

	public Category findById(Long id){
		return dao.findOne(id);
	}
	public Category save(Category item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}


	
}
