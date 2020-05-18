package com.simple.server.auto.controller;

import com.simple.server.auto.entity.ApplicationRelease;

import com.simple.server.auto.service.ApplicationReleaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequestMapping("/applicationrelease")
public class ApplicationReleaseController {
	@Autowired
	ApplicationReleaseService service;


	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<ApplicationRelease> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public ApplicationRelease findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
      return service.findById(id);

    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<ApplicationRelease> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ApplicationRelease save2(@RequestBody ApplicationRelease item) {

		System.out.println("input device params:" + item.toString());
        ApplicationRelease result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public ApplicationRelease updateSave(@RequestBody ApplicationRelease item, @PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
        ApplicationRelease result = service.save(item);
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