package com.simple.core.base.user.controller;

import java.util.Enumeration;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mobile.device.Device;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.simple.core.base.user.dao.UserRoleRepository;
import com.simple.core.base.user.entity.SysRole;
import com.simple.core.base.user.entity.User;
import com.simple.core.base.user.service.UserService;



@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserRoleRepository roleDao;
	
	@RequestMapping(value="/register",method=RequestMethod.POST)
	public User register(@RequestBody User user,@RequestParam(value="roleType", required=true, defaultValue="2") Long roleType){
	    
		return userService.register(user,roleType);
	}
	
	@ResponseBody
	@RequestMapping(value="/adminUsers/save",method=RequestMethod.POST)
	public User addUser(@RequestBody User user){
		return userService.save(user);
	}
	
	@ResponseBody
	@RequestMapping(value="/adminUsers/",method=RequestMethod.GET)
	public List<User> getAdminUsers(){
		return userService.getUsers();
	}
	
	@ResponseBody
	@RequestMapping(value="/roles/",method=RequestMethod.GET)
	public List<SysRole> getRoles(){
		return roleDao.findAll();
	}
	
	@ResponseBody
	@RequestMapping(value="/roles/save",method=RequestMethod.POST)
	public SysRole addRole(@RequestBody SysRole role){
		return roleDao.save(role);
	}
	
	@ResponseBody
	@RequestMapping(value="/roles/query/{id}",method=RequestMethod.GET)
	public SysRole getRoleById(@RequestParam Long id){
		//return userService.getUsers();
		return roleDao.findById(id);
	}
	
	@ResponseBody
	@RequestMapping(value="/adminUsers/query/{id}",method=RequestMethod.GET)
	public User getAdminUserById(@RequestParam Long id){
		//return userService.getUsers();
		return null;
	}
	@ResponseBody
	@RequestMapping(value="/users/",method=RequestMethod.POST)
	public List<User> getUsers(@RequestBody User user){
		return userService.getUsers();
	}
	@RequestMapping(value={"/","/index"},method=RequestMethod.GET)
    public String index(){
       return "index";
    }
   
    @RequestMapping(value="/login",method=RequestMethod.GET)
    public String login(HttpServletRequest request,Device device){
    	 String referer = request.getHeader("refererValue");
    	 System.out.println("Last request header: referer:" + referer + "serverPath " + request.getServletPath());
    	 
    	
    	
    	if (device.isMobile() || device.isTablet()){
    		return "redirect:/client/user/login";
    	}else{
    		return "redirect:/admin/user/login";
    	}
     
    }
	
    @RequestMapping(value="/welcome",method=RequestMethod.GET)
    public String logoutSuccess(HttpServletRequest request,Device device){
    	if (device.isMobile() || device.isTablet()){
    		return "redirect:/client/user/welcome";
    	}else{
    		return "redirect:/admin/user/welcome";
    	}
    }
    
    @RequestMapping(value="/home",method=RequestMethod.GET)
    public String defaultLoginSuccessPage(HttpServletRequest request,Device device){
    	if (device.isMobile() || device.isTablet()){
    		return "redirect:/client/home/";
    	}else{
    		return "redirect:/admin/home/";
    	}
    }
    /**
     * 用户添加;
     * @return
     */
    
    @RequestMapping(value="/403",method=RequestMethod.GET)
    public String noPersmission(){
       return "403";
    }
    
   
}
