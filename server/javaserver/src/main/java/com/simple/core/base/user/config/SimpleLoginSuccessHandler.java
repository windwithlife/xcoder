package com.simple.core.base.user.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.springframework.security.core.Authentication;

//import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.bind.annotation.ExceptionHandler;

public class SimpleLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {  
    
    //protected Log logger = LogFactory.getLog(getClass());  
      
    //private String defaultTargetUrl;  
      
    //private boolean forwardToDestination = false;  
      
    //private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();  
      
    //@Autowired  
    //private SysUsersRepository sysUsersRepository;  
    public SimpleLoginSuccessHandler(String defaultTargetUrl){
    	this.setDefaultTargetUrl(defaultTargetUrl);
    }
    
    private Boolean isJson(HttpServletRequest request){
        String header = request.getHeader("content-type");
        return header != null && header.contains("json");
    }
    
    

    
    @Override  
    @Transactional(readOnly=false,propagation= Propagation.REQUIRED,rollbackFor={Exception.class})  
    public void onAuthenticationSuccess(HttpServletRequest request,  
            HttpServletResponse response, Authentication authentication)  
            throws IOException, ServletException {  
          
    	String header = request.getHeader("content-type");
    	System.out.println("header content-type:"+ header);
    	if(isJson(request)) {
    		response.setCharacterEncoding("UTF-8");  
            response.setContentType("application/json");  
                    
            response.getWriter().println("{\"status\":\"1\",\"msg\":\"登录成功\"}");  
    	}else{
    		super.onAuthenticationSuccess(request, response, authentication);
    	}
    	
        //this.saveLoginInfo(request, authentication);  
          
        /*if(this.forwardToDestination){  
            logger.info("Login success,Forwarding to "+this.defaultTargetUrl);  
              
            request.getRequestDispatcher(this.defaultTargetUrl).forward(request, response);  
        }else{  
            logger.info("Login success,Redirecting to "+this.defaultTargetUrl);  
              
            this.redirectStrategy.sendRedirect(request, response, this.defaultTargetUrl);  
        }  */
    }  
      
    
      
    public String getIpAddress(HttpServletRequest request){    
        String ip = request.getHeader("x-forwarded-for");    
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {    
            ip = request.getHeader("Proxy-Client-IP");    
        }    
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {    
            ip = request.getHeader("WL-Proxy-Client-IP");    
        }    
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {    
            ip = request.getHeader("HTTP_CLIENT_IP");    
        }    
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {    
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");    
        }    
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {    
            ip = request.getRemoteAddr();    
        }    
        return ip;    
    }

	
  
    
  
    
}  
