package com.simple.server.auto.controller;

import com.simple.server.auto.entity.Application;
//import com.simple.server.auto.entity.ProjectRelease;
import com.simple.server.auto.service.ApplicationService;
//import com.simple.server.auto.service.ProjectReleaseService;
import com.simple.server.auto.service.XmoduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//import org.springframework.web.servlet.ModelAndView;


//import io.swagger.annotations.ApiImplicitParam;
//import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("/application")
public class ApplicationController {
	@Autowired
    ApplicationService service;

//	@Autowired
//    ProjectReleaseQueryDao queryDao;

    @Autowired
    XmoduleService xmoduleService;


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }


	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Application> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Application findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
        Application result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Application> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }



    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Application save2(@RequestBody Application item) {

		System.out.println("input device params:" + item.toString());
        Application result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Application updateSave(@RequestBody Application item, @PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
        Application result = service.save(item);
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


   

    
    @ResponseBody
    @RequestMapping(value = "/addNewByList", method = RequestMethod.POST)
    public int addNewByList(@RequestBody List<Application> items) {
            for(Application item:items){
                System.out.println("input device params:" + item.toString());
                Application result = service.save(item);
                System.out.println("output device result data:" + result.toString());

            }
            return items.size();

    }
    @ResponseBody
    @RequestMapping(value = "/removeByList", method = RequestMethod.POST)
    public int removeByList(@RequestBody List<Application> items) {
                for(Application item:items){
                    System.out.println("input device params:" + item.toString());
                    service.remove(item.getId());
                    //System.out.println("output device result data:" + result.toString());

                }
                return items.size();

    }

    

}