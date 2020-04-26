package <%=data.packageName%>.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.*;


import <%=data.packageName%>.entity.*;

import java.util.List;

@Entity
public class <%=data.nameClassName%> implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;  
    <%

    data.fields.forEach(function(field){
        if((field.name=='id')||(field.name=='_id')){
            return;
        }
        if (field.fieldType == 'Text'){%>
    @Column(columnDefinition="text")
    private <%=field.fieldTypeClassName%> <%=field.name%>;      
        <%}else if(field.mapType=='OneToMany'){%>

    @OneToMany(cascade=CascadeType.REMOVE,fetch=FetchType.LAZY)
    @JoinColumn(name="<%=field.referModule%>Id")        
    private List<<%=field.referModuleClass%>> <%=field.referModule%>s;

       <%}else if(field.mapType=='ManyToMany'){%>

    @ManyToMany
    @JoinTable(name = "<%=field.name%>_<%=field.referModule%>",joinColumns = @JoinColumn(name = "<%=field.name%>_id"),
            inverseJoinColumns = @JoinColumn(name = "<%=field.referModule%>_id"))        
    private List<<%=field.referModuleClass%>> <%=field.referModule%>s;

    <%}else if(field.mapType=='ManyToOne'){%>

    @ManyToOne(cascade=CascadeType.REMOVE,fetch=FetchType.LAZY)
    @JoinColumn(name="<%=field.referModule%>Id")        
    private <%=field.referModuleClass%> <%=field.referModule%>;
        
        <%}else{%>
    private <%=field.fieldTypeClassName%> <%=field.name%>; 
        <%}%>
    <%})%>

    public <%=data.nameClassName%>() {
    }
    
    <%data.fields.forEach(function(field){
        if((field.mapType=='OneToMany')||(field.mapType=='ManyToMany')){%>

    public List<<%=field.referModuleClass%>> get<%=field.referModuleClass%>(){
        return this.<%=field.referModule%>s;
    }   
    public void set<%=field.referModuleClass%>(List<<%=field.referModuleClass%>> <%=field.referModule%>s){
        this.<%=field.referModule%>s = <%=field.referModule%>s;
    } 
           
        
        <%}else if(field.mapType=='ManyToOne'){%>
    public <%=field.referModuleClass%> get<%=field.referModuleClass%>(){
        return this.<%=field.referModule%>;
    }   
    public void set<%=field.referModuleClass%>(<%=field.referModuleClass%> <%=field.referModule%>){
        this.<%=field.referModule%> = <%=field.referModule%>;
    }     
          
        <%}else{%>
    public <%=field.fieldTypeClassName%> get<%=field.nameClassName%>(){
        return this.<%=field.name%>;
    }   
    public void set<%=field.nameClassName%>(<%=field.fieldTypeClassName%> <%=field.name%>){
        this.<%=field.name%> = <%=field.name%>;
    } 
    <%}})%>
      
	@Override
	public String toString() {
		return "CLASS DATA: [" +"id=" + this.id +"name="+ this.name +"]";
	}
}
