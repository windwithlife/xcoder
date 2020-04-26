package <%=data.packageName%>.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import <%=data.packageName%>.entity.*;

public interface <%=data.nameClassName%>Repository extends JpaRepository<<%=data.nameClassName%>, Long> {
    public  List<<%=data.nameClassName%>> findByName(String name);
    public  List<<%=data.nameClassName%>> findByNameLike(String name);

    public  <%=data.nameClassName%> findOneByName(String name);
    public  <%=data.nameClassName%> findOneById(Long id);

    <%
    data.fields.forEach(function(field){
        if(field.mapType=='ManyToOne'){%>
    public List<<%=data.nameClassName%>> findBy<%=field.referModuleClass%>(Long id);    
    <%}})%>
        
}
