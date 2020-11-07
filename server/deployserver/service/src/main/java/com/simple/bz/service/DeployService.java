package com.simple.bz.service;

import com.alibaba.fastjson.JSON;
import com.github.structlog4j.ILogger;
import com.github.structlog4j.SLoggerFactory;
import com.simple.JsonUtils;
import com.simple.bz.dao.*;
import com.simple.bz.dto.*;
import com.simple.bz.model.*;
import com.simple.common.env.EnvConfig;
import com.simple.common.error.ServiceException;
import com.simple.common.error.ServiceHelper;
import com.simple.common.mqtt.MqttGateway;
import com.simple.common.props.AppProps;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeployService {

    static ILogger logger = SLoggerFactory.getLogger(DeployService.class);


    private final ReleaseDao releaseDao;
    private final ExampleDao exampleDao;
    private final ExecutePointDao executePointDao;
    private final ProjectDao projectDao;
    private final ApplicationTypeDao applicationTypeDao;

    private final AppProps appProps;

    private final EnvConfig envConfig;

    private final ServiceHelper serviceHelper;

    private final ModelMapper modelMapper;


    @Autowired
    private MqttService mqttService;


    public ExampleVO save(ExampleDto example){
        try{
            EndPointModel model = this.convertToModel(example);
            this.exampleDao.add(model);
            System.out.println(model.toString());
            ExampleVO vo = this.convertToVO(model);
            System.out.println(vo.toString());
            //return this.convertToVO(model);
            return vo;

        }catch (Exception ex){
            ServiceHelper.handleServiceException(ex,"failed");
            throw new ServiceException("failed to add data to database!");
        }


    }

    public ExampleVO update(ExampleDto example){
        try{
            EndPointModel model = this.convertToModel(example);
            this.exampleDao.update(model);

            return this.convertToVO(model);

        }catch (Exception ex){
            ServiceHelper.handleServiceException(ex,"failed to add");
            throw new ServiceException("failed to add data to database!");
        }


    }

    public String deleteById(String id){
        try{
            int count =  this.exampleDao.deleteById(id);
            if (count >0){
                return id;
            }else{
                return null;
            }
        }catch (Exception e){
            ServiceHelper.handleServiceException(e, "failed to delete model");
            return null;
        }

    }


    private ExampleVO convertToVO(EndPointModel endPointModel) {
        return modelMapper.map(endPointModel, ExampleVO.class);
    }

    private EndPointModel convertToModel(ExampleDto exampleDto) {
        return modelMapper.map(exampleDto, EndPointModel.class);
    }


    public void deployApplication(ReleaseRequest request){
        this.mqttService.executeRelease(request);
    }

}
