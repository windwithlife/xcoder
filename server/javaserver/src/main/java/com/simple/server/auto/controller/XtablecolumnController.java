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
@RequestMapping("/xcoder/xtablecolumn")
public class XtablecolumnController {
	@Autowired
	XtablecolumnService service;

//	@Autowired
//    XtablecolumnQueryDao queryDao;

    
    @Autowired
       private  XtableService xtableService;
    
    @Autowired
       private  DictionaryService dictionaryService;
    


   
   @ResponseBody
   @RequestMapping(value = "/queryByXtableId", method = RequestMethod.GET)
   public List<Xtablecolumn> queryByXtableId(@RequestParam("id") Long id) {
       List<Xtablecolumn> result = service.findByTableId(id);
       return result;
       //return null;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByFieldType", method = RequestMethod.GET)
   public List<Xtablecolumn> queryByFieldType(@RequestParam("id") Long id) {
       List<Xtablecolumn> result = service.findByFieldType(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByShowType", method = RequestMethod.GET)
   public List<Xtablecolumn> queryByShowType(@RequestParam("id") Long id) {
       List<Xtablecolumn> result = service.findByShowType(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByMap", method = RequestMethod.GET)
   public List<Xtablecolumn> queryByMap(@RequestParam("id") Long id) {
       List<Xtablecolumn> result = service.findByMap(id);
       return result;
   }

   


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Xtablecolumn> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Xtablecolumn findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	Xtablecolumn result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Xtablecolumn> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }

//
//    @ResponseBody
//    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
//    public List<Xtablecolumn> findByName(@RequestParam("name") String name ) {
//           	System.out.println("input param Name:" + name);
//            return queryDao.findByName(name);
//
//    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Xtablecolumn save2(@RequestBody Xtablecolumn item) {

		System.out.println("input device params:" + String.valueOf(item.getName()));
		Xtablecolumn result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Xtablecolumn updateSave(@RequestBody Xtablecolumn item,@PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
     	 Xtablecolumn result = service.save(item);
     	 System.out.println("output device result data:" + result.toString());
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
    	service.remove(id);
    	return id;
    }


   

    

}