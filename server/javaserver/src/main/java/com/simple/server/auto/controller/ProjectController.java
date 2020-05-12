package com.simple.server.auto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.ModelAndView;

//import com.simple.core.base.user.entity.*;
//import com.simple.core.base.user.service.*;

import com.simple.server.bz.entity.*;
import com.simple.server.bz.service.*;

import com.simple.server.auto.entity.*;
import com.simple.server.auto.service.*;
import com.simple.server.auto.dao.*;


//import io.swagger.annotations.ApiImplicitParam;
//import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("/project")
public class ProjectController {
	@Autowired
	ProjectService service;

//	@Autowired
////    ProjectQueryDao queryDao;

    


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Project> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Project findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	Project result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Project> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }

//
//    @ResponseBody
//    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
//    public List<Project> findByName(@RequestParam("name") String name ) {
//           	System.out.println("input param Name:" + name);
//            return queryDao.findByName(name);
//
//    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Project save2(@RequestBody Project item) {

		System.out.println("input device params:" + item.toString());
		Project result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Project updateSave(@RequestBody Project item,@PathVariable Long id) {
		Project old = service.findById(id);
		old.setName(item.getName());
		old.setWebsite(item.getWebsite());
		old.setSoaIp(item.getSoaIp());
		System.out.println("input update params Id:" + String.valueOf(id));
		Project result = null;
     	 try {
			 result = service.save(old);
		 }catch (Exception e){
     	 	System.out.println("***************failed to update item*****************");
     	 	e.printStackTrace();
		 }

		return result;

    }



    @ResponseBody
   	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
   	public Long remove(@PathVariable Long id) {
		service.remove(id);
        return id;
    }
    @ResponseBody
    @RequestMapping(value = "/remove/{id}", method = RequestMethod.POST)
    public Long removeById(@PathVariable Long id) {
		Project old = service.findById(id);
		old.setStatus(-1L);
		service.save(old);
    	//service.remove(id);
    	return id;
    }


   

    

}