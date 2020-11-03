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
@RequestMapping("/<%=data.moduleName%>")
public class <%=data.nameClassName%>ModuleController {
	
	// @Autowired
    // <%=data.className%>QueryDao queryDao;

    <% data.refers.forEach(function(referModule){%>
    @Autowired
    private  <%=referModule.className%>Service <%=referModule.name%>Service;
    <%})%>
  
 	


    <%
    var operations = data.interfaces;
    operations.forEach(function(operation){
   %>
   @ResponseBody
   @RequestMapping(value = "<%=operation.declaredPath%>", method = RequestMethod.<%-operation.requestMethodType%>)
   public <%-operation.outputType%> <%=operation.name%>(@RequestBody <%-operation.inputType%> request) {
        return null;
   }
   <%
     })
    %>
   
   
}