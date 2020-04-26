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
@RequestMapping("/xpagexinterface")
public class XpagexinterfaceController {
	@Autowired
	XpagexinterfaceService service;

	@Autowired
    XpagexinterfaceQueryDao queryDao;

    


   
   @ResponseBody
   @RequestMapping(value = "/queryByXpageId", method = RequestMethod.GET)
   public List<Xpagexinterface> queryByXpageId(@RequestParam("id") Long id) {
       List<Xpagexinterface> result = service.findByXpageId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByXpageName", method = RequestMethod.GET)
   public List<Xpagexinterface> queryByXpageName(@RequestParam("id") Long id) {
       List<Xpagexinterface> result = service.findByXpageName(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByXinterfaceId", method = RequestMethod.GET)
   public List<Xpagexinterface> queryByXinterfaceId(@RequestParam("id") Long id) {
       List<Xpagexinterface> result = service.findByXinterfaceId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByXinterfaceName", method = RequestMethod.GET)
   public List<Xpagexinterface> queryByXinterfaceName(@RequestParam("id") Long id) {
       List<Xpagexinterface> result = service.findByXinterfaceName(id);
       return result;
   }

   


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Xpagexinterface> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Xpagexinterface findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	Xpagexinterface result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Xpagexinterface> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<Xpagexinterface> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return queryDao.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Xpagexinterface save2(@RequestBody Xpagexinterface item) {

		System.out.println("input device params:" + item.toString());
		Xpagexinterface result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Xpagexinterface updateSave(@RequestBody Xpagexinterface item,@PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
     	 Xpagexinterface result = service.save(item);
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
    public int addNewByList(@RequestBody List<Xpagexinterface> items) {
            for(Xpagexinterface item:items){
                System.out.println("input device params:" + item.toString());
                Xpagexinterface result = service.save(item);
                System.out.println("output device result data:" + result.toString());

            }
            return items.size();

    }
    @ResponseBody
    @RequestMapping(value = "/removeByList", method = RequestMethod.POST)
    public int removeByList(@RequestBody List<Xpagexinterface> items) {
                for(Xpagexinterface item:items){
                    System.out.println("input device params:" + item.toString());
                    service.remove(item.getId());
                    //System.out.println("output device result data:" + result.toString());

                }
                return items.size();

    }

    

}