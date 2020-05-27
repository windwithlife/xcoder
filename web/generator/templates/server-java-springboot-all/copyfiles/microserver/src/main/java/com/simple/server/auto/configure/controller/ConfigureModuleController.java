package com.simple.server.auto.configure.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.ModelAndView;



import com.simple.server.auto.configure.entity.*;
import com.simple.server.auto.configure.service.*;
import com.simple.server.auto.configure.dao.*;
import com.simple.server.auto.configure.dto.*;


//import io.swagger.annotations.ApiImplicitParam;
//import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("/Configure")
public class ConfigureModuleController {
	
	// @Autowired
    // QueryDao queryDao;

    
    @Autowired
    private  MenuService menuService;
    
  
 	


    
   
   
}