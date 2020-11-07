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
public class MqttService {

    static ILogger logger = SLoggerFactory.getLogger(MqttService.class);


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
    private MqttGateway mqttGateway;


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

    public void handleMessage(String topic, String payload){

        System.out.println("MQTT Service Received topic: " + topic);
        System.out.println("MQTT Service Received payload: " + payload);
        if (!JsonUtils.isJson(payload)){
            System.out.println("Invalid String Message ! Received payload: " + payload);
            return;
        }
        MqttRequest request = JSON.parseObject(payload, MqttRequest.class);
        if((null == request) || null == request.getCommand()){return;}

        if(request.getCommand().equals("register")){
            EndPointDto endPoint = request.getParamObject(EndPointDto.class);
            registerEndpoint(endPoint);
        }
        if(request.getCommand().equals("release")){
            ReleaseRequest release = request.getParamObject(ReleaseRequest.class);
            executeRelease(release);
            //registerEndpoint(endPoint);
        }
    }
    private void registerEndpoint(EndPointDto dto){
         System.out.println("start to register endpoint  " + dto.toString());
    }

    public void executeRelease(ReleaseRequest request){
        try{

            System.out.println("start to execute release  " + request.toString());
            ApplicationRelease releaseModel = releaseDao.findById(request.getReleaseId());



            if(null != releaseModel){
                ReleaseDetail dto = modelMapper.map(releaseModel, ReleaseDetail.class);//ReleaseDetail.builder().build();
                System.out.println("release data " + releaseModel.toString());
                //bring build id info
                dto.setBuildId(request.getBuildId());
                dto.setEnvType(request.getEnvType());


                //get project information
                ProjectModel project = projectDao.findById(releaseModel.getProjectId());
                dto.setProjectInfo(project);

                //get application type info
                ApplicationType appType = applicationTypeDao.findById(releaseModel.getApplicationTypeId());
                dto.setApplicationTypeInfo(appType);

                //get the target execute point.
                ExcuteReleasePoint point = executePointDao.findById(releaseModel.getApplicationPointId());
                System.out.println("excute point data " + point.toString());
                String executePointTopic = "ci/simple/point/pointa/execute"; //point.getTopicName();



                MqttDto mqttDto = MqttDto.builder().command("execute").build();
                mqttDto.setCommand("execute");
                mqttDto.setParamObject(dto);
                System.out.println(mqttDto.toString());
                mqttGateway.sendToMqtt(executePointTopic, mqttDto.toString());

            }


        }catch (Exception e){
            e.printStackTrace();
        }

    }
}
