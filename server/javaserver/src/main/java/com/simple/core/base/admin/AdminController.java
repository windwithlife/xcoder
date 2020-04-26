package com.simple.core.base.admin;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.Environment;
import org.springframework.mobile.device.Device;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/admin")
public class AdminController  implements EnvironmentAware {
	
	 private String port ;
	 
	@Override
    public void setEnvironment(Environment environment) {
        String s = environment.getProperty("server.port");
        System.out.println(s);
        this.port = s;
    }
	
	@RequestMapping(value= "/user/login", method=RequestMethod.GET)   
    public String login(Device device){

    	if (device.isMobile()){
    		System.out.println("Client Device is Mobile");
    	}else if(device.isTablet()){
    		System.out.println("Client Device is Tablet");
    	}else{
    		System.out.println("Client Device is PC");
    		
    	}
    	return "login";
    }
	
	@RequestMapping(value= "/**/", method=RequestMethod.GET)
   
    public  ModelAndView index(){
		
		String username = null;
		try{
			UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		   
		   username = userDetails.getUsername();;
		}catch(Exception e){
			username = null;
		}
			
			System.out.println("Current user name is:" + username);
			 return new ModelAndView("admin-index", "username", username);  
      // return "admin-index";
    } 
	 
	  
	   @RequestMapping(value= "/analyse/{side}", method=RequestMethod.GET)
	    //@RequiresPermissions("userInfo:del")//权限管理;
	    public ModelAndView manageAndAnalysis(@PathVariable String side){
		     String url = "http://localhost:" + this.port + "/manage/" + side;
             System.out.println(url);
             ModelAndView model = new ModelAndView("analyse");
             RestTemplate restTemplate = new RestTemplate();
        
             try{
            	 String result = restTemplate.getForObject(url, String.class);
            	 System.out.println("analyse" + result);
            	
            	 model.addObject("item",result);
             }catch(Exception e){
            	 System.out.println("Can't get analyse result");
            	 model.addObject("item","Can't get analyse result");
             }
			 return model;
	       //return "analyse";
	    }
	   
	 
}


