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
@RequestMapping("/xpagepageinterface")
public class XpagepageinterfaceController {
	@Autowired
	XpagepageinterfaceService service;

	@Autowired
    XpagepageinterfaceQueryDao queryDao;

    


   
   @ResponseBody
   @RequestMapping(value = "/queryByXpageId", method = RequestMethod.GET)
   public List<Xpagepageinterface> queryByXpageId(@RequestParam("id") Long id) {
       List<Xpagepageinterface> result = service.findByXpageId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByXpageName", method = RequestMethod.GET)
   public List<Xpagepageinterface> queryByXpageName(@RequestParam("id") Long id) {
       List<Xpagepageinterface> result = service.findByXpageName(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByPageinterfaceId", method = RequestMethod.GET)
   public List<Xpagepageinterface> queryByPageinterfaceId(@RequestParam("id") Long id) {
       List<Xpagepageinterface> result = service.findByPageinterfaceId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByPageinterfaceName", method = RequestMethod.GET)
   public List<Xpagepageinterface> queryByPageinterfaceName(@RequestParam("id") Long id) {
       List<Xpagepageinterface> result = service.findByPageinterfaceName(id);
       return result;
   }

   


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Xpagepageinterface> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Xpagepageinterface findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	Xpagepageinterface result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Xpagepageinterface> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<Xpagepageinterface> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return queryDao.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Xpagepageinterface save2(@RequestBody Xpagepageinterface item) {

		System.out.println("input device params:" + item.toString());
		Xpagepageinterface result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Xpagepageinterface updateSave(@RequestBody Xpagepageinterface item,@PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
     	 Xpagepageinterface result = service.save(item);
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
    public int addNewByList(@RequestBody List<Xpagepageinterface> items) {
            for(Xpagepageinterface item:items){
                System.out.println("input device params:" + item.toString());
                Xpagepageinterface result = service.save(item);
                System.out.println("output device result data:" + result.toString());

            }
            return items.size();

    }
    @ResponseBody
    @RequestMapping(value = "/removeByList", method = RequestMethod.POST)
    public int removeByList(@RequestBody List<Xpagepageinterface> items) {
                for(Xpagepageinterface item:items){
                    System.out.println("input device params:" + item.toString());
                    service.remove(item.getId());
                    //System.out.println("output device result data:" + result.toString());

                }
                return items.size();

    }

    

}