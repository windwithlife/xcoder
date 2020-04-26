package com.simple.core.framework.exception;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.ModelAndView;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;

@ControllerAdvice
public class DefaultWebControllerHandler {
   
    public static final String DEFAULT_ERROR_VIEW = "error";

    @ModelAttribute
    public void addAttribute(Model model){
  	  model.addAttribute("msg", "test global message");
    }
    
    private Boolean isJson(HttpServletRequest request){
        String header = request.getHeader("content-type");
        return header != null && header.contains("json");
    }
    
     

    @ExceptionHandler(Exception.class)
    public Object handleBaseException(HttpServletRequest request, Exception e) {

        if(isJson(request)) {
            e.printStackTrace();
        	HttpHeaders headers = new HttpHeaders();  
            headers.setContentType(MediaType.APPLICATION_JSON); 
        	return new ResponseEntity<String>("{status:-1,msg:'failed to handle your post request'}",  
                     headers, HttpStatus.INTERNAL_SERVER_ERROR); 
         
        } else {
        	ModelAndView mav = new ModelAndView();
            mav.addObject("exception", e.getMessage());
            
            mav.addObject("url", request.getRequestURL());
        	if (e instanceof AccessDeniedException){
        		mav.setViewName("403");
       		 	System.out.println("No Permission!");
       		 	return mav;	 
            }
        	
        	mav.setViewName(DEFAULT_ERROR_VIEW);
            e.printStackTrace();
            System.out.println("**********************************************\r\n"
             		+ "Error happened !!!, Be handled in Global-DefaultException-Handler!\r\n"
             		+ "**********************************************\r\n");
            return mav;
        }
    }
  
   
}