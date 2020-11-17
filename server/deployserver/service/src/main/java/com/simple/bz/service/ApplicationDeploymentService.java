package com.simple.bz.service;



import com.simple.bz.dao.*;
import com.simple.bz.dto.*;
import com.simple.bz.model.*;
import com.simple.common.env.EnvConfig;
import com.simple.common.error.ServiceHelper;
import com.simple.common.props.AppProps;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

//此注解保证变量被DI
@RequiredArgsConstructor
@Service
public class ApplicationDeploymentService {
    private final ModelMapper modelMapper;


    private final ApplicationDeploymentRepository dao;
    private final ReleaseDao releaseDao;
    private final ExampleDao exampleDao;
    private final ExecutePointDao executePointDao;
    private final ProjectDao projectDao;
    private final ApplicationTypeRepository applicationTypeDao;
    private final ApplicationRepository applicationDao;
    private final DeploymentConfigRepository deploymentConfigDao;
    private final DockerImageRepository dockerImageDao;
    private final MqttService mqttService;

    private final AppProps appProps;

    private final EnvConfig envConfig;

    private final ServiceHelper serviceHelper;

    public ApplicationDeploymentModel convertToModel(ApplicationReleaseDto dto){
        return this.modelMapper.map(dto, ApplicationDeploymentModel.class);
    }
    public List<ApplicationDeploymentModel> convertToModels(List<ApplicationReleaseDto> dtos){
        List<ApplicationDeploymentModel> resultList = new ArrayList<ApplicationDeploymentModel>();
        for (int i=0; i < dtos.size(); i++){
            resultList.add(this.convertToModel(dtos.get(i)));
        }
        return resultList;
    }
    public ApplicationReleaseDto convertToDto(ApplicationDeploymentModel model){
        return this.modelMapper.map(model, ApplicationReleaseDto.class);
    }

    public List<ApplicationReleaseDto> convertToDtos(List<ApplicationDeploymentModel> models){
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

        List<ApplicationDeploymentModel> list =   dao.findAll();
        return  this.convertToDtos(list);
    }

    public List<ApplicationReleaseDto> findByApplicationId(Long id){

        List<ApplicationDeploymentModel> list =  dao.findByApplicationId(id);
        return  this.convertToDtos(list);
    }

    public List<ApplicationReleaseDto> findByEnvType(ApplicationReleaseListRequest request){
        List<ApplicationDeploymentModel> list =  dao.findByApplicationIdAndEnvType(request.getApplicationId(),request.getEnvType());
        return  this.convertToDtos(list);
    }


    public ApplicationReleaseDto findById(Long id){
        ApplicationDeploymentModel model =  dao.findById(id).get();
        return this.convertToDto(model);
    }
    public void save(ApplicationReleaseDto item){
        ApplicationDeploymentModel model = this.convertToModel(item);
        this.dao.save(model);


    }

    public ApplicationReleaseDto update(ApplicationReleaseDto item){
        Long id = item.getId();
        ApplicationDeploymentModel model = dao.findById(id).get();
        if(null == model ){return null;}
        this.modelMapper.map(item, model);
        this.dao.save(model);
        return item;
    }


    public void remove(Long id){
        this.dao.deleteById(id);
    }

    public void buildImage(DockerBuildRequest request) {
        System.out.println("start to build image  " + request.toString());
        try {


            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");
            String buildNumber = sdf.format(new Date());
            System.out.println("current build number=====>  " + buildNumber);


            if (null != request) {
                ReleaseDetail dto = ReleaseDetail.builder().build();

                //bring build id info
                dto.setBuildNumber(buildNumber);

                Long applicationId = request.getApplicationId();
                ApplicationModel application  = null;
                if(applicationId <= 0){
                     application = applicationDao.findOneByApplicationName(request.getApplicationName());
                }else{
                    application = applicationDao.findById(request.getApplicationId()).get();
                }
                request.setApplicationId(application.getId());

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
                //DeploymentGroupModel point = executePointDao.findById(request.getApplicationPointId());
                //System.out.println("excute point data " + point.toString());
                String executePointTopic = "ci/simple/point/pointa/execute"; //point.getTopicName();

                //register docker image
                String buildName = this.getBuildName(request.getApplicationId(),request.getVersion());

//                if(StringUtils.isNotBlank(request.getVersion())){
//                    buildName = request.getVersion() + "-" + buildNumber;
//                }else if(StringUtils.isNotBlank(config.getVersion())){
//                    buildName = config.getVersion() + "-" + buildNumber;
//                }

                DockerImageModel dockerImage = DockerImageModel.builder().buildName(buildName).name(application.getName()).applicationId(application.getId())
                        .version(dto.getReleaseVersion()).deploymentId(dto.getId()).build();
                dockerImageDao.save(dockerImage);
                mqttService.deployTo(dto, executePointTopic, "buildImage");


            }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private  String getBuildName(Long applicationId,String inputVersion){

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");
        String buildNumber = sdf.format(new Date());
        System.out.println("current build number=====>  " + buildNumber);
        String buildName = buildNumber;
        if(StringUtils.isNotBlank(inputVersion)){
            buildName = inputVersion + "-" + buildNumber;
            return buildName;
        }
        try{
            DeploymentConfigModel config = deploymentConfigDao.findById(applicationId).get();
            if(StringUtils.isNotBlank(config.getVersion())){
                buildName = config.getVersion() + "-" + buildNumber;
            }

        }catch (Exception e){
            e.printStackTrace();
        }

        return buildName;
    }
    public void deployApplication(ReleaseRequest request){
        try{

            System.out.println("start to execute release  " + request.toString());
            ApplicationDeploymentModel releaseModel = releaseDao.findById(request.getReleaseId());

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
                //register docker image
                String buildName = dto.getReleaseVersion() +  "-" + buildNumber;
                DockerImageModel dockerImage = DockerImageModel.builder().buildName(buildName).name(application.getName()).applicationId(application.getId())
                        .version(dto.getReleaseVersion()).deploymentId(dto.getId()).build();
                dockerImageDao.save(dockerImage);

                mqttService.deployTo(dto, executePointTopic,"execute");
                //mqttService.deployTo(dto, executePointTopic, command);

            }


        }catch (Exception e){
            e.printStackTrace();
        }

    }


}