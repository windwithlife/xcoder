package com.simple.bz.service;



import com.simple.bz.dao.ApplicationReleaseRepository;
import com.simple.bz.dto.ApplicationReleaseDto;
import com.simple.bz.dto.ApplicationReleaseListRequest;
import com.simple.bz.model.ApplicationReleaseModel;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

//此注解保证变量被DI
@RequiredArgsConstructor
@Service
public class ApplicationReleaseService {
    private final ModelMapper modelMapper;


    private final ApplicationReleaseRepository dao;

    public ApplicationReleaseModel convertToModel(ApplicationReleaseDto dto){
        return this.modelMapper.map(dto, ApplicationReleaseModel.class);
    }
    public List<ApplicationReleaseModel> convertToModels(List<ApplicationReleaseDto> dtos){
        List<ApplicationReleaseModel> resultList = new ArrayList<ApplicationReleaseModel>();
        for (int i=0; i < dtos.size(); i++){
            resultList.add(this.convertToModel(dtos.get(i)));
        }
        return resultList;
    }
    public ApplicationReleaseDto convertToDto(ApplicationReleaseModel model){
        return this.modelMapper.map(model, ApplicationReleaseDto.class);
    }

    public List<ApplicationReleaseDto> convertToDtos(List<ApplicationReleaseModel> models){
        if(null == models) {
            List<ApplicationReleaseDto> dtos = new ArrayList<ApplicationReleaseDto>();
            return dtos;
        }
        List<ApplicationReleaseDto> resultList = new ArrayList<ApplicationReleaseDto>();
        for (int i=0; i < models.size(); i++){
            resultList.add(this.convertToDto(models.get(i)));
        }
        return resultList;

    }
    public List<ApplicationReleaseDto> findAll(){

        List<ApplicationReleaseModel> list =   dao.findAll();
        return  this.convertToDtos(list);
    }

    public List<ApplicationReleaseDto> findByApplicationId(Long id){

        List<ApplicationReleaseModel> list =  dao.findByApplicationId(id);
        return  this.convertToDtos(list);
    }

    public List<ApplicationReleaseDto> findByEnvType(ApplicationReleaseListRequest request){
        List<ApplicationReleaseModel> list =  dao.findByApplicationIdAndEnvType(request.getApplicationId(),request.getEnvType());
        return  this.convertToDtos(list);
    }


    public ApplicationReleaseDto findById(Long id){
        ApplicationReleaseModel model =  dao.findById(id).get();
        return this.convertToDto(model);
    }
    public void save(ApplicationReleaseDto item){
        ApplicationReleaseModel model = this.convertToModel(item);
        this.dao.save(model);


    }

    public ApplicationReleaseDto update(ApplicationReleaseDto item){
        Long id = item.getId();
        ApplicationReleaseModel model = dao.findById(id).get();
        if(null == model ){return null;}
        this.modelMapper.map(item, model);
        this.dao.save(model);
        return item;
    }


    public void remove(Long id){
        this.dao.deleteById(id);
    }

}