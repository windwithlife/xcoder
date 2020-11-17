package com.simple.bz.controller;

import com.simple.bz.dto.DockerBuildRequest;
import com.simple.bz.dto.DockerImageDto;
import com.simple.bz.service.DockerImageService;
import com.simple.common.api.GenericRequest;
import com.simple.common.api.GenericResponse;
import com.simple.common.controller.BaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/dockerimage")
public class DockerImageController extends BaseController {

    private final DockerImageService service;


    @GetMapping(path = "/findAll")
    GenericResponse findAll (){

        List<DockerImageDto> dtoList = service.findAll();
        if(null == dtoList) {
            dtoList = new ArrayList<DockerImageDto>();
        }
        GenericResponse result = GenericResponse.build().addKey$Value("list", dtoList);

        return result;
    }
    @GetMapping(path = "/findById")
    GenericResponse findById (@RequestParam("id") Long applicationId){

        System.out.println("applicationId:" + String.valueOf(applicationId));

        DockerImageDto  application = service.findById(applicationId);
        GenericResponse result = GenericResponse.build().setDataObject(application);
        return result;
    }
    @PostMapping(path = "/save")
    GenericResponse createDeployment (@RequestBody GenericRequest req){

        DockerImageDto dto = req.getObject(DockerImageDto.class);
        System.out.println(dto.toString());
        service.save(dto);
        GenericResponse result = new GenericResponse(dto);
        return result;
    }

    @PostMapping(path = "/buildImage")
    GenericResponse buildDockerImage (@RequestBody GenericRequest req){
        DockerBuildRequest dto = req.getObject(DockerBuildRequest.class);
        System.out.println(dto.toString());
        //service.save(dto);
        service.buildDockerImage(dto);
        GenericResponse result = new GenericResponse(dto);
        return result;
    }

    @GetMapping(path = "/autoDeployment")
    GenericResponse buildDockerImage (DockerBuildRequest request){
        System.out.println(request.toString());
        service.buildDockerImage(request);
        GenericResponse result = new GenericResponse(request);
        return result;
    }

    @GetMapping(path = "/findByApplicationId")
        GenericResponse getByApplicationId (@RequestParam("id") Long applicationId){

        System.out.println("projectId:" + String.valueOf(applicationId));

        List<DockerImageDto>  applications = service.findByApplicationId(applicationId);
        GenericResponse result = GenericResponse.build().addKey$Value("list", applications);
        return result;
    }



    @PostMapping(path = "/update/{id}")
    public GenericResponse updateSave(@RequestBody GenericRequest req , @PathVariable Long id) {
        DockerImageDto dto = req.getObject(DockerImageDto.class);
        dto.setId(id);
        System.out.println("applicationId:" + String.valueOf(id));
        service.update(dto);
        GenericResponse result = new GenericResponse(dto);
        return result;


    }


    @ResponseBody
    @RequestMapping(value = "/remove/{id}", method = RequestMethod.POST)
    public Long removeById(@PathVariable Long id) {
        service.remove(id);
        return id;
    }




}
