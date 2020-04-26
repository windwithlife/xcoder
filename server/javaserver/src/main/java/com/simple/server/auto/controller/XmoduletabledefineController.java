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
@RequestMapping("/xmoduletabledefine")
public class XmoduletabledefineController {
	@Autowired
	XmoduletabledefineService service;

	@Autowired
    XmoduletabledefineQueryDao queryDao;

    


   
   @ResponseBody
   @RequestMapping(value = "/queryByXmoduleId", method = RequestMethod.GET)
   public List<Xmoduletabledefine> queryByXmoduleId(@RequestParam("id") Long id) {
       List<Xmoduletabledefine> result = service.findByXmoduleId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByXmoduleName", method = RequestMethod.GET)
   public List<Xmoduletabledefine> queryByXmoduleName(@RequestParam("id") Long id) {
       List<Xmoduletabledefine> result = service.findByXmoduleName(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByTabledefineId", method = RequestMethod.GET)
   public List<Xmoduletabledefine> queryByTabledefineId(@RequestParam("id") Long id) {
       List<Xmoduletabledefine> result = service.findByTabledefineId(id);
       return result;
   }

   
   @ResponseBody
   @RequestMapping(value = "/queryByTabledefineName", method = RequestMethod.GET)
   public List<Xmoduletabledefine> queryByTabledefineName(@RequestParam("id") Long id) {
       List<Xmoduletabledefine> result = service.findByTabledefineName(id);
       return result;
   }

   


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Xmoduletabledefine> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Xmoduletabledefine findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	Xmoduletabledefine result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Xmoduletabledefine> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public List<Xmoduletabledefine> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return queryDao.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Xmoduletabledefine save2(@RequestBody Xmoduletabledefine item) {

		System.out.println("input device params:" + item.toString());
		Xmoduletabledefine result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Xmoduletabledefine updateSave(@RequestBody Xmoduletabledefine item,@PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
     	 Xmoduletabledefine result = service.save(item);
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
    public int addNewByList(@RequestBody List<Xmoduletabledefine> items) {
            for(Xmoduletabledefine item:items){
                System.out.println("input device params:" + item.toString());
                Xmoduletabledefine result = service.save(item);
                System.out.println("output device result data:" + result.toString());

            }
            return items.size();

    }
    @ResponseBody
    @RequestMapping(value = "/removeByList", method = RequestMethod.POST)
    public int removeByList(@RequestBody List<Xmoduletabledefine> items) {
                for(Xmoduletabledefine item:items){
                    System.out.println("input device params:" + item.toString());
                    service.remove(item.getId());
                    //System.out.println("output device result data:" + result.toString());

                }
                return items.size();

    }

    

}