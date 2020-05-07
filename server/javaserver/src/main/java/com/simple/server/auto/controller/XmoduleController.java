package com.simple.server.auto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.ModelAndView;

import com.simple.core.base.user.entity.*;
import com.simple.core.base.user.service.*;

import com.simple.server.bz.entity.*;
import com.simple.server.bz.service.*;

import com.simple.server.auto.entity.*;
import com.simple.server.auto.service.*;
import com.simple.server.auto.dao.*;


//import io.swagger.annotations.ApiImplicitParam;
//import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("/xmodule")
public class XmoduleController {
	@Autowired
	XmoduleService service;

	@Autowired
    XmoduleQueryDao queryDao;

    
    @Autowired
       private  XpageService xpageService;
    
    @Autowired
       private  XtableService xtableService;
    
    @Autowired
       private  DictionaryService dictionaryService;
    @Autowired
    private  ProjectService projectService;
    





    @ResponseBody
    @RequestMapping(value = "/queryByProject", method = RequestMethod.GET)
    public List<Xmodule> queryByProject(@RequestParam("id") Long id) {
        //Project item = projectService.findById(id);
        List<Xmodule> result = service.findByProjectId(id);

        return result;
    }


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Xmodule> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Xmodule findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	Xmodule result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Xmodule> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<Xmodule> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return queryDao.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Xmodule save2(@RequestBody Xmodule item) {
        
		System.out.println("input device params:" + item.toString());
		Xmodule result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Xmodule updateSave(@RequestBody Xmodule item,@PathVariable Long id) {
        Xmodule old = service.findById(id);
        old.setName(item.getName());
        old.setDescription(item.getDescription());
        try {
            return service.save(old);

        }catch (Exception e){
            System.out.println("***************failed to update item*****************");
            e.printStackTrace();
            return null;
        }

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
    	service.remove(id);
    	return id;
    }


   

    

}