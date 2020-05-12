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
@RequestMapping("/xinterface")
public class XinterfaceController {
	@Autowired
	XinterfaceService service;

//	@Autowired
//    XinterfaceQueryDao queryDao;

    
    @Autowired
       private  DictionaryService dictionaryService;
    


   
   @ResponseBody
   @RequestMapping(value = "/queryByStatus", method = RequestMethod.GET)
   public List<Xinterface> queryByStatus(@RequestParam("id") Long id) {
       List<Xinterface> result = service.findByStatus(id);
       return result;
   }

    @ResponseBody
    @RequestMapping(value = "/queryByModuleId", method = RequestMethod.GET)
    public List<Xinterface> queryByModuleId(@RequestParam("id") Long id) {
        List<Xinterface> result = service.findByModuleId(id);
        return result;
    }



	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Xinterface> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Xinterface findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	Xinterface result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Xinterface> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }

//
//    @ResponseBody
//    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
//    public List<Xinterface> findByName(@RequestParam("name") String name ) {
//           	System.out.println("input param Name:" + name);
//            return queryDao.findByName(name);
//
//    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Xinterface save2(@RequestBody Xinterface item) {

		System.out.println("input device params:" + item.toString());
		Xinterface result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Xinterface updateSave(@RequestBody Xinterface item,@PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
     	 Xinterface result = service.save(item);
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