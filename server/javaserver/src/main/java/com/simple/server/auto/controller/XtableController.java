package com.simple.server.auto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.ModelAndView;
//
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
@RequestMapping("/xcoder/xtable")
public class XtableController {
	@Autowired
	XtableService service;

//	@Autowired
//    XtableQueryDao queryDao;

    
    @Autowired
       private  DictionaryService dictionaryService;
    


   
   @ResponseBody
   @RequestMapping(value = "/queryByStatus", method = RequestMethod.GET)
   public List<Xtable> queryByStatus(@RequestParam("id") Long id) {
       List<Xtable> result = service.findByStatus(id);
       return result;
   }
    @ResponseBody
    @RequestMapping(value = "/queryByModule", method = RequestMethod.GET)
    public List<Xtable> queryByModule(@RequestParam("id") Long id) {
        List<Xtable> result = service.findByModuleId(id);
        return result;
    }
   


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Xtable> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Xtable findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	Xtable result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Xtable> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


//    @ResponseBody
//    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
//    public List<Xtable> findByName(@RequestParam("name") String name ) {
//           	System.out.println("input param Name:" + name);
//            return queryDao.findByName(name);
//
//    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Xtable save2(@RequestBody Xtable item) {

		System.out.println("input device params:" + item.toString());
		Xtable result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Xtable updateSave(@RequestBody Xtable item,@PathVariable Long id) {
        System.out.println("input device params:" + item.toString());
        Xtable old = service.findById(id);
		old.setName(item.getName());
		old.setDescription(item.getDescription());
		System.out.println("input update params Id:" + String.valueOf(id));
		Xtable result = null;
     	 try {
			 result = service.save(old);
		 }catch (Exception e){
     	 	System.out.println("***************failed to update item*****************");
     	 	e.printStackTrace();
		 }finally {
			 return result;
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