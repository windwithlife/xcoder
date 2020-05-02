package <%=data.packageName%>.dto;

import java.io.Serializable;

import <%=data.packageName%>.entity.*;

import java.util.List;
import java.util.ArrayList;

public class <%=data.nameClassName%> implements Serializable {
	private static final long serialVersionUID = 1L;

    <%
    data.fields.forEach(function(field){%>
    private <%-field.fieldTypeClassName%> <%=field.name%>;         
    <%})%>

    public <%=data.nameClassName%>() {
    } 
   


    <%
    data.fields.forEach(function(field){%>
       
    public <%-field.fieldTypeClassName%> get<%=field.nameClassName%>(){
        return this.<%=field.name%>;
    }   
    public void set<%=field.nameClassName%>(<%-field.fieldTypeClassName%> <%=field.name%>){
        this.<%=field.name%> = <%=field.name%>;
    }        
    <%})%>

  
}
