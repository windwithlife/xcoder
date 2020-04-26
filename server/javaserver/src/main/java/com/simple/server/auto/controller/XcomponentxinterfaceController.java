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
@RequestMapping("/xcomponentxinterface")
public class XcomponentxinterfaceController {
	@Autowired
	XcomponentxinterfaceService service;

	@Autowired
    XcomponentxinterfaceQueryDao queryDao;

    


   
   @ResponseBody
   @RequestMapping(value = "/queryByXcomponentId", method = RequestMethod.GET)
   public List<Xcomponentxinterface> queryByXcomponentId(@RequestParam("id") Long id) {
       List<Xcomponentxinterface> result = service.findByXcomponentId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByXcomponentName", method = RequestMethod.GET)
   public List<Xcomponentxinterface> queryByXcomponentName(@RequestParam("id") Long id) {
       List<Xcomponentxinterface> result = service.findByXcomponentName(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByXinterfaceId", method = RequestMethod.GET)
   public List<Xcomponentxinterface> queryByXinterfaceId(@RequestParam("id") Long id) {
       List<Xcomponentxinterface> result = service.findByXinterfaceId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByXinterfaceName", method = RequestMethod.GET)
   public List<Xcomponentxinterface> queryByXinterfaceName(@RequestParam("id") Long id) {
       List<Xcomponentxinterface> result = service.findByXinterfaceName(id);
       return result;
   }

   


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Xcomponentxinterface> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Xcomponentxinterface findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	Xcomponentxinterface result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Xcomponentxinterface> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<Xcomponentxinterface> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return queryDao.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Xcomponentxinterface save2(@RequestBody Xcomponentxinterface item) {

		System.out.println("input device params:" + item.toString());
		Xcomponentxinterface result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Xcomponentxinterface updateSave(@RequestBody Xcomponentxinterface item,@PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
     	 Xcomponentxinterface result = service.save(item);
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
    public int addNewByList(@RequestBody List<Xcomponentxinterface> items) {
            for(Xcomponentxinterface item:items){
                System.out.println("input device params:" + item.toString());
                Xcomponentxinterface result = service.save(item);
                System.out.println("output device result data:" + result.toString());

            }
            return items.size();

    }
    @ResponseBody
    @RequestMapping(value = "/removeByList", method = RequestMethod.POST)
    public int removeByList(@RequestBody List<Xcomponentxinterface> items) {
                for(Xcomponentxinterface item:items){
                    System.out.println("input device params:" + item.toString());
                    service.remove(item.getId());
                    //System.out.println("output device result data:" + result.toString());

                }
                return items.size();

    }

    

}