package <%=data.packageName%>.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.ModelAndView;

import <%=data.packageName%>.entity.*;
import <%=data.packageName%>.service.*;
import <%=data.packageName%>.dao.*;
import <%=data.packageName%>.dto.*;


//import io.swagger.annotations.ApiImplicitParam;
//import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("/<%=data.moduleName%>/<%=data.name%>")
public class <%=data.nameClassName%>Controller {
	@Autowired
	<%=data.nameClassName%>Service service;

	// @Autowired
    // <%=data.className%>QueryDao queryDao;

    <% data.refers.forEach(function(referModule){%>
    @Autowired
    private  <%=referModule.className%>Service <%=referModule.name%>Service;
    
    <%})%>
   
	@RequestMapping(value = "/queryAll", method = RequestMethod.GET)
	@ResponseBody
	public <%=data.responseListDtoClassName%> findAll() {
		return service.findAll();
	}
	@ResponseBody
    @RequestMapping(value = "/query/{id}", method = RequestMethod.GET)
    public <%=data.responseDtoClassName%> findByKeyId(@PathVariable Long id) {
       	System.out.println("input param Id:" + id);
       	<%=data.responseDtoClassName%> result = service.findById(id);
    	return result;
    }
    @ResponseBody
    @RequestMapping(value = "/queryByNameLike/", method = RequestMethod.GET)
    public <%=data.responseListDtoClassName%> findByNameLike(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByNameLike(name);

    }


    @ResponseBody
    @RequestMapping(value = "/queryByName", method = RequestMethod.GET)
    public <%=data.responseListDtoClassName%> findByName(@RequestParam("name") String name ) {
           	System.out.println("input param Name:" + name);
            return service.findByName(name);

    }

    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public  <%=data.responseDtoClassName%> addSave(@RequestBody <%=data.requestDtoClassName%> item) {

		System.out.println("input device params:" + item.toString());
		<%=data.responseDtoClassName%> result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}



 	@ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public <%=data.responseDtoClassName%>  updateSave(@RequestBody <%=data.requestDtoClassName%> item,@PathVariable Long id) {
     	System.out.println("input params id and name:" + item.toString());
     	<%=data.responseDtoClassName%> result= null;
        try{
            result = service.update(item);
        }catch (Exception e){
                System.out.println("***************failed to update item******  ***********");
                e.printStackTrace();
                return null;
        }
        return result;
    }

    
    @ResponseBody
    @RequestMapping(value = "/remove/{id}", method = RequestMethod.POST)
    public Long removeById(@PathVariable Long id) {
    	service.remove(id);
    	return id;
    }

    <%
    data.fields.forEach(function(field){
        if(field.mapType=='ManyToOne'){%>
    @ResponseBody
    @RequestMapping(value = "/queryBy<%=fieldNameUpper%>", method = RequestMethod.GET)
    
    public <%=data.responseListDtoClassName%> queryBy<%=field.referModuleClass%>(@RequestParam("id") Long id) {
        return <%=data.responseListDtoClassName%> result = service.findBy<%=field.referModuleClass%>(id);
      
    <%}})%>
   
   
}