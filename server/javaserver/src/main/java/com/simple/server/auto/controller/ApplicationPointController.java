package com.simple.server.auto.controller;

import com.simple.server.auto.entity.ApplicationPoint;
import com.simple.server.auto.entity.ApplicationType;
import com.simple.server.auto.service.ApplicationPointService;
import com.simple.server.auto.service.ApplicationTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@Controller
@RequestMapping("/xcoder/applicationpoint")
public class ApplicationPointController {
	@Autowired
	ApplicationPointService service;



   

	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<ApplicationPoint> findAll() {
		return service.findAll();
	}


	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public ApplicationPoint findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
		ApplicationPoint result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<ApplicationPoint> findByNameLike(@RequestParam("name") String name ) {
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
	public ApplicationPoint save2(@RequestBody ApplicationPoint item) {

		System.out.println("input device params:" + item.toString());
		ApplicationPoint result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public ApplicationPoint updateSave(@RequestBody ApplicationPoint item,@PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
		ApplicationPoint result = service.save(item);
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