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
import org.apache.commons.lang.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class MqttService {

    static ILogger logger = SLoggerFactory.getLogger(MqttService.class);


    private final ReleaseDao releaseDao;
    private final ExampleDao exampleDao;
    private final ExecutePointDao executePointDao;
    private final ProjectDao projectDao;
    private final ApplicationTypeRepository applicationTypeDao;
    private final ApplicationRepository applicationDao;
    private final DeploymentConfigRepository deploymentConfigDao;

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
            ApplicationReleaseModel releaseModel = releaseDao.findById(request.getReleaseId());

            SimpleDateFormat sdf =   new SimpleDateFormat( "yyyy-MM-dd-HH-mm-ss" );
            String buildNumber = sdf.format(new Date());
            System.out.println("current build number=====>  " + buildNumber);




            if(null != releaseModel){
                ReleaseDetail dto = modelMapper.map(releaseModel, ReleaseDetail.class);//ReleaseDetail.builder().build();
                System.out.println("release data " + releaseModel.toString());
                //bring build id info
                dto.setBuildNumber(buildNumber);
                dto.setBuildId(request.getBuildId());
                dto.setEnvType(request.getEnvType());


                ApplicationModel application = applicationDao.findById(releaseModel.getApplicationId()).get();
                //get project information
                ProjectModel project = projectDao.findById(application.getProjectId());
                dto.setProjectInfo(project);
                dto.setApplicationInfo(application);

                DeploymentConfigModel config = deploymentConfigDao.findById(application.getDeploymentConfigId()).get();
                dto.setDeploymentConfig(config);
                //get application type info
                ApplicationTypeModel appType = applicationTypeDao.findById(application.getApplicationTypeId()).get();
                dto.setApplicationTypeInfo(appType);

                //get the target execute point.
                DeploymentGroupModel point = executePointDao.findById(releaseModel.getApplicationPointId());
                System.out.println("excute point data " + point.toString());
                String executePointTopic = "ci/simple/point/pointa/execute"; //point.getTopicName();


                //do with domainName
                String domainName ="no.domain.com";
                if(request.getEnvType().toLowerCase().equals("uat")){
                    if(appType.getSideType().toLowerCase().equals("web") || appType.getSideType().toLowerCase().equals("website")){
                        domainName = project.getDomainNameUAT();
                        if(StringUtils.isNotBlank(application.getDomainName())){
                            domainName = "uat." + application.getDomainName();
                        }
                    }else if(appType.getSideType().toLowerCase().equals("server")){
                        domainName = project.getGatewayUAT();
                    }
                }else if(request.getEnvType().toLowerCase().equals("prod")){
                    if(appType.getSideType().toLowerCase().equals("web") || appType.getSideType().toLowerCase().equals("website")){
                        domainName = project.getDomainName();
                        if(StringUtils.isNotBlank(application.getDomainName())){
                            domainName = application.getDomainName();
                        }

                    }else if(appType.getSideType().toLowerCase().equals("server")){
                        domainName = project.getGateway();
                    }
                }
                dto.setDomainName(domainName);

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
