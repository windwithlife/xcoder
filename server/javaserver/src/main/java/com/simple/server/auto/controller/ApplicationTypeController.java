package com.simple.server.auto.controller;

import com.simple.server.auto.entity.ApplicationType;
import com.simple.server.auto.entity.Category;
import com.simple.server.auto.service.ApplicationTypeService;
import com.simple.server.auto.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//import org.springframework.web.servlet.ModelAndView;
//import com.simple.core.base.user.entity.*;
//import com.simple.core.base.user.service.*;


//import io.swagger.annotations.ApiImplicitParam;
//import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("/applicationtype")
public class ApplicationTypeController {
	@Autowired
	ApplicationTypeService service;



   

	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<ApplicationType> findAll() {
		return service.findAll();
	}


	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public ApplicationType findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
		ApplicationType result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<ApplicationType> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }

//
//    @ResponseBody
//    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
//    public List<Category> findByName(@RequestParam("name") String name ) {
//           	System.out.println("input param Name:" + name);
//            return queryDao.findByName(name);
//
//    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ApplicationType save2(@RequestBody ApplicationType item) {

		System.out.println("input device params:" + item.toString());
		ApplicationType result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public ApplicationType updateSave(@RequestBody ApplicationType item,@PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
		ApplicationType result = service.save(item);
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