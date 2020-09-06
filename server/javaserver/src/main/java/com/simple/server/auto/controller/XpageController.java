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
@RequestMapping("/xcoder/xpage")
public class XpageController {
	@Autowired
	XpageService service;

	//@Autowired
    //XpageQueryDao queryDao;

    
    @Autowired
       private  XinterfaceService xinterfaceService;
    @Autowired
    private  XwidgetService xwidgetService;
    
    @Autowired
       private  DictionaryService dictionaryService;
    


   
   @ResponseBody
   @RequestMapping(value = "/queryByStatus", method = RequestMethod.GET)
   public List<Xpage> queryByStatus(@RequestParam("id") Long id) {
       List<Xpage> result = service.findByStatus(id);
       return result;
   }


    @ResponseBody
    @RequestMapping(value = "/addInterface", method = RequestMethod.GET)
    public Long addInterface(@RequestParam("id") Long id, @RequestParam("interfaceId") Long interfaceId) {
       try {
           Xpage page = service.findById(id);
           Xinterface interfaceObj = xinterfaceService.findById(interfaceId);
           if((null != page) &&(null!= interfaceObj)){
                page.getInterfaces().add(interfaceObj);
                service.save(page);
           }

       }catch (Exception e){
           e.printStackTrace();
           return  -1L;
       }
        return interfaceId;
    }

    @ResponseBody
    @RequestMapping(value = "/deleteInterface", method = RequestMethod.GET)
    public Long deleteInterface(@RequestParam("id") Long id, @RequestParam("interfaceId") Long interfaceId) {
        try{
            Xpage page = service.findById(id);
            Xinterface interfaceObj = xinterfaceService.findById(interfaceId);
            if((null != page) &&(null!= interfaceObj)){
                page.getInterfaces().remove(interfaceObj);
                service.save(page);
            }
            return interfaceId;
        }catch (Exception e){
            e.printStackTrace();
            return  -1L;
        }
    }

    @ResponseBody
    @RequestMapping(value = "/addWidget", method = RequestMethod.GET)
    public Long addWidget(@RequestParam("id") Long id, @RequestParam("widgetId") Long widgetId) {
        try {
            Xpage page = service.findById(id);
            Xwidget obj = xwidgetService.findById(widgetId);
            if((null != page) &&(null!= obj)){
                page.getWidgets().add(obj);
                service.save(page);
            }

        }catch (Exception e){
            e.printStackTrace();
            return  -1L;
        }
        return widgetId;
    }

    @ResponseBody
    @RequestMapping(value = "/deleteWidget", method = RequestMethod.GET)
    public Long deleteWidget(@RequestParam("id") Long id, @RequestParam("widgetId") Long widgetId) {
        System.out.println("input param widget id:" + widgetId);
        try{
            Xpage page = service.findById(id);
            Xwidget obj = xwidgetService.findById(widgetId);
            if((null != page) &&(null!= obj)){
                page.getWidgets().remove(obj);
                service.save(page);
                System.out.println("sucess remove widget pageId:" + id );
            }

            return widgetId;
        }catch (Exception e){
            e.printStackTrace();
            return  -1L;
        }
    }


    @RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Xpage> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Xpage findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	Xpage result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Xpage> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }

//
//    @ResponseBody
//    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
//    public List<Xpage> findByName(@RequestParam("name") String name ) {
//           	System.out.println("input param Name:" + name);
//            return queryDao.findByName(name);
//    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Xpage save2(@RequestBody Xpage item) {

		System.out.println("input device params:" + item.toString());
		Xpage result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Xpage updateSave(@RequestBody Xpage item,@PathVariable Long id) {
        System.out.println("update xpage input update params Id:" + String.valueOf(id));
        Xpage result = null;
        try {
            Xpage old = service.findById(id);
            old.setDescription(item.getDescription());
            old.setName(item.getName());
            old.setDefineText(item.getDefineText());
            result = service.save(old);
        }catch (Exception e){
            System.out.println("***************failed to update item*****************");
            e.printStackTrace();
        }finally {
            return result;
        }
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