package <%=data.packageName%>.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import <%=data.packageName%>.dao.*;
import <%=data.packageName%>.entity.*;
import <%=data.packageName%>.dto.*;


@Service
public class <%=data.nameClassName%>Service {
	@Autowired
	<%=data.nameClassName%>Repository dao;
	public <%=data.responseListDtoClassName%> findAll(){
		return  transferEntity2ResponseListDto(dao.findAll());
		//return items;
	}
	public <%=data.responseListDtoClassName%> findByName(String name){
		return transferEntity2ResponseListDto(dao.findByName(name));
	}
	public  <%=data.responseListDtoClassName%> findByNameLike(String name){
    		return transferEntity2ResponseListDto(dao.findByNameLike(name));
    }

	public  <%=data.responseDtoClassName%> findOneByName(String name){
    		return transferEntity2ResponseDto(dao.findOneByName(name));
    	}

	public <%=data.responseDtoClassName%> findById(Long id){
		return transferEntity2ResponseDto(dao.findOneById(id));
	}
	public <%=data.responseDtoClassName%> save(<%=data.requestDtoClassName%> item){
		<%=data.nameClassName%> entityObj = transferRequestDto2Entity(item);
		return transferEntity2ResponseDto(this.dao.save(entityObj));
	}

	public <%=data.responseDtoClassName%> update(<%=data.requestDtoClassName%> item){

		<%=data.responseDtoClassName%> result= null;
		
        try{
            <%=data.nameClassName%> oldEntity = dao.findOneById(item.getId());
          <%
          data.fields.forEach(function(field){
              if(field.mapType=='NULL'){%>
                oldEntity.set<%=field.nameClassName%>(item.get<%=field.nameClassName%>());
          <%}})%>
		  <%=data.nameClassName%> entityObj = dao.save(oldEntity);
		  return transferEntity2ResponseDto(entityObj);
        }catch (Exception e){
                System.out.println("***************failed to update item******  ***********");
                e.printStackTrace();
                return null;
        }
		
	}
	public void remove(Long id){
		this.dao.delete(id);
	}
	
	<%
    data.fields.forEach(function(field){
        if(field.mapType=='ManyToOne'){%>
    public <%=data.responseListDtoClassName%> findBy<%=field.referModuleClass%>(Long id){

		return transferEntity2ResponseListDto(dao.findBy<%=field.referModuleClass%>(id));
	}    
	<%}})%>
	
    public <%=data.nameClassName%> transferRequestDto2Entity(<%=data.requestDtoClassName%> inputDto){
		<%=data.nameClassName%> newEntity = new <%=data.nameClassName%>();
		<%
		data.fields.forEach(function(field){
			if(field.mapType=='NULL'){%>
				newEntity.set<%=field.nameClassName%>(inputDto.get<%=field.nameClassName%>());
		<%}})%>
		return newEntity;
	}

	public <%=data.responseDtoClassName%> transferEntity2ResponseDto(<%=data.nameClassName%> entityObj){
		<%=data.responseDtoClassName%> response = new <%=data.responseDtoClassName%>();
		<%
		data.fields.forEach(function(field){
			if(field.mapType=='NULL'){%>
				response.set<%=field.nameClassName%>(entityObj.get<%=field.nameClassName%>());
		<%}})%>
		return response;
	}

	public <%=data.responseListDtoClassName%> transferEntity2ResponseListDto(List<<%=data.nameClassName%>> entityObjs){

		<%=data.responseListDtoClassName%> responseList = new <%=data.responseListDtoClassName%>();

	    for(int i=0; i< entityObjs.size(); i++){
			<%=data.responseDtoClassName%> response = transferEntity2ResponseDto(entityObjs.get(i));
			
			responseList.getItems().add(response);
		}
		responseList.setItemsCount(new Long(entityObjs.size()));
		return responseList;
		
	}

}
