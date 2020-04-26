package com.simple.server.auto.controller;

import com.simple.server.auto.entity.ProjectRelease;
import com.simple.server.auto.entity.Xmodule;
import com.simple.server.auto.entity.Xrelease;

import com.simple.server.auto.service.XreleaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequestMapping("/xrelease")
public class XreleaseController {
	@Autowired
    XreleaseService service;


	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Xrelease> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public Xrelease findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
      return service.findById(id);

    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<Xrelease> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Xrelease save2(@RequestBody Xrelease item) {

		System.out.println("input device params:" + item.toString());
        Xrelease result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Xrelease updateSave(@RequestBody Xrelease item, @PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
        Xrelease result = service.save(item);
     	 System.out.println("output device result data:" + result.toString());
     	 return result;
    }

    @ResponseBody
    @RequestMapping(value = "/remove/{id}", method = RequestMethod.POST)
    public Long removeById(@PathVariable Long id) {
    	service.remove(id);
    	return id;
    }


}