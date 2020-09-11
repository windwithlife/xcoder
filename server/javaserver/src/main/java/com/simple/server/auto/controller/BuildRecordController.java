package com.simple.server.auto.controller;

import com.simple.server.auto.entity.ApplicationPoint;
import com.simple.server.auto.entity.BuildRecord;
import com.simple.server.auto.service.ApplicationPointService;
import com.simple.server.auto.service.BuildRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequestMapping("/xcoder/buildrecord")
public class BuildRecordController {
	@Autowired
	BuildRecordService service;



   

	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<BuildRecord> findAll() {
		return service.findAll();
	}


	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public BuildRecord findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
		BuildRecord result = service.findById(id);
    	return result;
    }
    @ResponseBody
	@RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
	public List<BuildRecord> findByNameLike(@RequestParam("name") String name ) {
		System.out.println("input param Name:" + name);
		return service.findByNameLike(name);

	}

	@ResponseBody
	@RequestMapping(value = "/queryByApplicationReleaseId", method = RequestMethod.GET)
	public List<BuildRecord> findByApplicationReleaseId(@RequestParam("releaseId") Long releaseId ) {
		System.out.println("start to queryByApplicationReleaseId");
		return service.findByApplicationReleaseId(releaseId);

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
	public BuildRecord save2(@RequestBody BuildRecord item) {

		System.out.println("input device params:" + item.toString());
		BuildRecord result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public BuildRecord updateSave(@RequestBody BuildRecord item,@PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
		BuildRecord result = service.save(item);
     	 System.out.println("output device result data:" + result.toString());
     	 return result;
    }

	@ResponseBody
	@RequestMapping(value = "/updateReleaseStatus", method = RequestMethod.GET)
	public BuildRecord  updateReleaseStatus(@RequestParam("releaseId") Long releaseId, @RequestParam("status") String status) {
		System.out.println("start to queryByApplicationReleaseId");
		BuildRecord buildRecord= service.findById(releaseId);
		if(null != buildRecord){
			buildRecord.setReleaseStatus(status);
			service.save(buildRecord);
		}
		return buildRecord;
	}

	@ResponseBody
	@RequestMapping(value = "/sendReleaseLog", method = RequestMethod.GET)
	public BuildRecord  sendReleaseLog(@RequestParam("releaseId") Long releaseId, @RequestParam("log") String logText) {
		System.out.println("build log text:" + logText);
		BuildRecord buildRecord= service.findById(releaseId);
		if(null != buildRecord){
			buildRecord.setLogText(logText);
			service.save(buildRecord);
		}
		return buildRecord;
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