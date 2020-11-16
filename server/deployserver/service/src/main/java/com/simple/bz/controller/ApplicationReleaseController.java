package com.simple.bz.controller;

import com.simple.bz.dto.ApplicationReleaseDto;
import com.simple.bz.dto.ApplicationReleaseListRequest;
import com.simple.bz.dto.ReleaseRequest;
import com.simple.bz.service.ApplicationReleaseService;
import com.simple.bz.service.DeployService;
import com.simple.common.api.GenericRequest;
import com.simple.common.api.GenericResponse;
import com.simple.common.controller.BaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/applicationrelease")
public class ApplicationReleaseController extends BaseController {

    private final ApplicationReleaseService service;
    private final DeployService deployService;


    @GetMapping(path = "/findAll")
    GenericResponse createDeployment (){

        List<ApplicationReleaseDto> dtoLst = service.findAll();
        GenericResponse result = GenericResponse.build().addKey$Value("list", dtoLst);

        return result;
    }
    @GetMapping(path = "/findById")
    GenericResponse findById (@RequestParam("id") Long applicationId){

        System.out.println("applicationId:" + String.valueOf(applicationId));

        ApplicationReleaseDto  application = service.findById(applicationId);
        GenericResponse result = GenericResponse.build().setDataObject(application);
        return result;
    }
    @PostMapping(path = "/save")
    GenericResponse createDeployment (@RequestBody GenericRequest req){

        ApplicationReleaseDto dto = req.getObject(ApplicationReleaseDto.class);
        System.out.println(dto.toString());
        service.save(dto);
        GenericResponse result = new GenericResponse(dto);
        return result;
    }

    @GetMapping(path = "/getByApplicationId")
        GenericResponse getByProjectId (@RequestParam("id") Long applicationId){

        System.out.println("projectId:" + String.valueOf(applicationId));

        List<ApplicationReleaseDto>  applications = service.findByApplicationId(applicationId);
        GenericResponse result = GenericResponse.build().addKey$Value("list", applications);
        return result;
    }
    @GetMapping(path = "/getDeploymentList")
    GenericResponse getListByEnv (ApplicationReleaseListRequest request){
        System.out.println(request.toString());
        List<ApplicationReleaseDto>  applications = service.findByEnvType(request);
        GenericResponse result = GenericResponse.build().addKey$Value("list", applications);
        return result;
    }
    @PostMapping(path = "/deployTo")
    GenericResponse deployment (@RequestBody GenericRequest req){
        System.out.println(req.toString());
        ReleaseRequest releaseDto = req.getObject(ReleaseRequest.class);
        deployService.deployApplication(releaseDto);
        GenericResponse result = new GenericResponse(releaseDto);
        return result;
    }



    @PostMapping(path = "/update/{id}")
    public GenericResponse updateSave(@RequestBody GenericRequest req , @PathVariable Long id) {
        ApplicationReleaseDto item = req.getObject(ApplicationReleaseDto.class);
        item.setId(id);
        System.out.println("applicationId:" + String.valueOf(id));
        service.update(item);
        GenericResponse result = new GenericResponse(item);
        return result;


    }


    @ResponseBody
    @RequestMapping(value = "/remove/{id}", method = RequestMethod.POST)
    public Long removeById(@PathVariable Long id) {
        service.remove(id);
        return id;
    }




}
