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
@RequestMapping("/projectrelease")
public class ProjectReleaseController {
	@Autowired
    ProjectReleaseService service;

//	@Autowired
//    ProjectReleaseQueryDao queryDao;

    @Autowired
    XmoduleService xmoduleService;

    


//
//   @ResponseBody
//   @RequestMapping(value = "/queryByProjectRelaseId", method = RequestMethod.GET)
//   public List<ProjectRelease> queryByReleaseId(@RequestParam("id") Long id) {
//       List<ProjectRelease> result = service.findByReleaseId(id);
//       return result;
//   }




   


	@RequestMapping(value= "/", method=RequestMethod.GET)
    public String rootpage(){
    	       return "index";
    }
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public List<ProjectRelease> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public ProjectRelease findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	ProjectRelease result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public List<ProjectRelease> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


//    @ResponseBody
//    @RequestMapping(value = "/addModule", method = RequestMethod.GET)
//    public Long addModule(@RequestParam("id") Long id, @RequestParam("moduleId") Long moduleId) {
//        try {
//            ProjectRelease release = service.findById(id);
//            Xmodule obj = xmoduleService.findById(moduleId);
//            if((null != release) &&(null!= obj)){
//                release.getModules().add(obj);
//                service.save(release);
//            }
//
//        }catch (Exception e){
//            e.printStackTrace();
//            return  -1L;
//        }
//        return moduleId;
//    }
//
//    @ResponseBody
//    @RequestMapping(value = "/deleteModule", method = RequestMethod.GET)
//    public Long deleteModule(@RequestParam("id") Long id, @RequestParam("moduleId") Long moduleId) {
//
//        try {
//            ProjectRelease release = service.findById(id);
//            Xmodule obj = xmoduleService.findById(moduleId);
//            if((null != release) &&(null!= obj)){
//                release.getModules().remove(obj);
//                service.save(release);
//            }
//
//        }catch (Exception e){
//            e.printStackTrace();
//            return  -1L;
//        }
//        return moduleId;
//
//    }
//
//    @ResponseBody
//    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
//    public List<ProjectRelease> findByName(@RequestParam("name") String name ) {
//           	System.out.println("input param Name:" + name);
//            return queryDao.findByName(name);
//
//    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ProjectRelease save2(@RequestBody ProjectRelease item) {

		System.out.println("input device params:" + item.toString());
		ProjectRelease result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public ProjectRelease updateSave(@RequestBody ProjectRelease item, @PathVariable Long id) {

     	 System.out.println("input device params:" + item.toString());
     	 ProjectRelease result = service.save(item);
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
    public int addNewByList(@RequestBody List<ProjectRelease> items) {
            for(ProjectRelease item:items){
                System.out.println("input device params:" + item.toString());
                ProjectRelease result = service.save(item);
                System.out.println("output device result data:" + result.toString());

            }
            return items.size();

    }
    @ResponseBody
    @RequestMapping(value = "/removeByList", method = RequestMethod.POST)
    public int removeByList(@RequestBody List<ProjectRelease> items) {
                for(ProjectRelease item:items){
                    System.out.println("input device params:" + item.toString());
                    service.remove(item.getId());
                    //System.out.println("output device result data:" + result.toString());

                }
                return items.size();

    }

    

}