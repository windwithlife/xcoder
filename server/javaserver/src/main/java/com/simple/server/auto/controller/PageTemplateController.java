package com.simple.server.auto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.ModelAndView;

import com.simple.server.auto.entity.*;
import com.simple.server.auto.service.*;
import com.simple.server.auto.dao.*;


//import io.swagger.annotations.ApiImplicitParam;
//import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("/xcoder/pagetemplate")
public class PageTemplateController {
	@Autowired
    PageTemplateService service;

//	@Autowired
//    PageTemplateQueryDao queryDao;

    
    @Autowired
       private  XinterfaceService xinterfaceService;
    
    @Autowired
       private  DictionaryService dictionaryService;
    


   
   @ResponseBody
   @RequestMapping(value = "/queryByStatus", method = RequestMethod.GET)
   public List<PageTemplate> queryByStatus(@RequestParam("id") Long id) {
       List<PageTemplate> result = service.findByStatus(id);
       return result;
   }

   


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<PageTemplate> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public PageTemplate findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	PageTemplate result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<PageTemplate> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }

//
//    @ResponseBody
//    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
//    public List<PageTemplate> findByName(@RequestParam("name") String name ) {
//           	System.out.println("input param Name:" + name);
//            return queryDao.findByName(name);
//
//    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public PageTemplate save2(@RequestBody PageTemplate item) {

		System.out.println("input device params:" + item.toString());
		PageTemplate result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public PageTemplate updateSave(@RequestBody PageTemplate item, @PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
     	 PageTemplate result = service.save(item);
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
        @RequestMapping(value = "/findByApplicationTypeId/{id}", method = RequestMethod.GET)
        public List<PageTemplate> findByApplicationType(@RequestParam("id") Long id) {

            return service.findByApplicationTypeId(id);

    }


    

}