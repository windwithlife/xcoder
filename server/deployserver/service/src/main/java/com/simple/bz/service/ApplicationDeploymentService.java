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

    public ApplicationDeploymentModel convertToModel(ApplicationDeploymentDto dto){
        return this.modelMapper.map(dto, ApplicationDeploymentModel.class);
    }
    public List<ApplicationDeploymentModel> convertToModels(List<ApplicationDeploymentDto> dtos){
        List<ApplicationDeploymentModel> resultList = new ArrayList<ApplicationDeploymentModel>();
        for (int i=0; i < dtos.size(); i++){
            resultList.add(this.convertToModel(dtos.get(i)));
        }
        return resultList;
    }
    public ApplicationDeploymentDto convertToDto(ApplicationDeploymentModel model){
        return this.modelMapper.map(model, ApplicationDeploymentDto.class);
    }

    public List<ApplicationDeploymentDto> convertToDtos(List<ApplicationDeploymentModel> models){
        if(null == models) {
            List<ApplicationDeploymentDto> dtos = new ArrayList<ApplicationDeploymentDto>();
            return dtos;
        }
        List<ApplicationDeploymentDto> resultList = new ArrayList<ApplicationDeploymentDto>();
        for (int i=0; i < models.size(); i++){
            resultList.add(this.convertToDto(models.get(i)));
        }
        return resultList;

    }
    public List<ApplicationDeploymentDto> findAll(){

        List<ApplicationDeploymentModel> list =   dao.findAll();
        return  this.convertToDtos(list);
    }

    public List<ApplicationDeploymentDto> findByApplicationId(Long id){

        List<ApplicationDeploymentModel> list =  dao.findByApplicationId(id);
        return  this.convertToDtos(list);
    }

    public List<ApplicationDeploymentDto> findByEnvType(ApplicationReleaseListRequest request){
        List<ApplicationDeploymentModel> list =  dao.findByApplicationIdAndEnvType(request.getApplicationId(),request.getEnvType());
        return  this.convertToDtos(list);
    }


    public ApplicationDeploymentDto findById(Long id){
        ApplicationDeploymentModel model =  dao.findById(id).get();
        return this.convertToDto(model);
    }
    public void save(ApplicationDeploymentDto item){
        ApplicationDeploymentModel model = this.convertToModel(item);
        if (null != item.getImageId()){
            DockerImageModel image = dockerImageDao.findById(item.getImageId()).get();
            model.setBuildNumber(image.getBuildNumber());
            model.setImageLabel(image.getImageLabel());
        }
        this.dao.save(model);


    }

    public ApplicationDeploymentDto update(ApplicationDeploymentDto item){
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


//            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");
//            String buildNumber = sdf.format(new Date());
//            System.out.println("current build number=====>  " + buildNumber);


            if (null != request) {
                ReleaseDetail dto = ReleaseDetail.builder().build();

                Long applicationId = request.getApplicationId();
                ApplicationModel application  = null;
                if(null == applicationId){
                    application = applicationDao.findOneByApplicationName(request.getApplicationName());
                }else{
                    application = applicationDao.findById(request.getApplicationId()).get();
                }

                //bring build id info
                String buildNumber = this.getBuildNumber();
                String imageLabel = this.getImageLabel(application.getId(),request.getVersion());
                String version = this.getVersion(application.getId(),request.getVersion());
                dto.setBuildNumber(buildNumber);
                dto.setImageLabel(imageLabel);


                System.out.println("***********************Current Application info ===>");
                System.out.println(application.toString());
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
                ///String executePointTopic = "ci/simple/point/pointa/execute"; //point.getTopicName();

                //register docker image



                DockerImageModel dockerImage = DockerImageModel.builder().buildNumber(buildNumber).buildName(imageLabel).imageLabel(imageLabel).name(application.getName()).applicationId(application.getId())
                        .version(version).deploymentId(dto.getId()).build();
                dockerImageDao.save(dockerImage);


                DeploymentGroupModel point = executePointDao.findById(project.getBuildGroupId());
                System.out.println("deploy to topic " + point.getTopicName());
                String targetTopic =  "ci/simple/point/pointa/execute";
                if(StringUtils.isNotBlank(point.getTopicName())){
                    targetTopic = point.getTopicName();
                }


                mqttService.deployTo(dto, targetTopic, "buildImage");


            }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private  String getImageLabel(Long applicationId,String inputVersion){

        String buildNumber = this.getBuildNumber();
        System.out.println("current build number=====>  " + buildNumber);
        String version = this.getVersion(applicationId,inputVersion);
        String imageLabel = version + '-' + buildNumber;
        return imageLabel;

    }

    private String getVersion(Long applicationId,String inputVersion){

        String versionDefault = "V1.0.0";
        if(StringUtils.isNotBlank(inputVersion)){

            return inputVersion;
        }
        try{
            DeploymentConfigModel config = deploymentConfigDao.findById(applicationId).get();
            if(StringUtils.isNotBlank(config.getVersion())){
                return config.getVersion();
            }

        }catch (Exception e){
            e.printStackTrace();
        }

        return versionDefault;

    }
    private  String getBuildNumber(){

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");
        String buildNumber = sdf.format(new Date());
        System.out.println("current build number=====>  " + buildNumber);

        return buildNumber;
    }
    public void deployApplicationWithImage(ReleaseRequest request){
        try{

            System.out.println("start to execute release  " + request.toString());

            ApplicationDeploymentModel releaseModel = releaseDao.findById(request.getReleaseId());




            if(null != releaseModel){
                ReleaseDetail dto = modelMapper.map(releaseModel, ReleaseDetail.class);//ReleaseDetail.builder().build();
                System.out.println("release data " + releaseModel.toString());

                dto.setEnvType(request.getEnvType());

                //get docker image id, buildNumber information
                DockerImageModel imageInfo = dockerImageDao.findById(releaseModel.getImageId()).get();
                dto.setBuildNumber(imageInfo.getBuildNumber());
                dto.setImageLabel(imageInfo.getImageLabel());

                ApplicationModel application = applicationDao.findById(releaseModel.getApplicationId()).get();
                //get project information
                ProjectModel project = projectDao.findById(application.getProjectId());
                dto.setProjectInfo(project);
                dto.setApplicationInfo(application);

                //get application type info
                ApplicationTypeModel appType = applicationTypeDao.findById(application.getApplicationTypeId()).get();
                dto.setApplicationTypeInfo(appType);


                //do with domainName
                String domainName ="no.domain.com";
                Long groupId = 0L;
                if(request.getEnvType().toLowerCase().equals("uat")){
                    if(appType.getSideType().toLowerCase().equals("web") || appType.getSideType().toLowerCase().equals("website")){
                        domainName = project.getDomainNameUAT();
                        if(StringUtils.isNotBlank(application.getDomainName())){
                            domainName = "uat." + application.getDomainName();
                        }
                    }else if(appType.getSideType().toLowerCase().equals("server")){
                        domainName = project.getGatewayUAT();
                    }
                    groupId = project.getUatGroupId();

                }else if(request.getEnvType().toLowerCase().equals("prod")){
                    if(appType.getSideType().toLowerCase().equals("web") || appType.getSideType().toLowerCase().equals("website")){
                        domainName = project.getDomainName();
                        if(StringUtils.isNotBlank(application.getDomainName())){
                            domainName = application.getDomainName();
                        }

                    }else if(appType.getSideType().toLowerCase().equals("server")){
                        domainName = project.getGateway();
                    }
                    groupId = project.getProdGroupId();
                }
                dto.setDomainName(domainName);

                if(null != releaseModel.getApplicationPointId()){
                    groupId =  releaseModel.getApplicationPointId();
                }

                //get the target execute point.
                String targetTopic = "ci/simple/point/pointa/execute";
                //DeploymentGroupModel point = executePointDao.findById(releaseModel.getApplicationPointId());
                DeploymentGroupModel point = executePointDao.findById(groupId);
                dto.setSupportMesh(point.getSupportMesh());
                System.out.println("deploy to topic " + point.getTopicName());
                if(StringUtils.isNotBlank(point.getTopicName())){
                    targetTopic = point.getTopicName();
                }
                mqttService.deployTo(dto, targetTopic,"deployToGroups");

            }


        }catch (Exception e){
            e.printStackTrace();
        }

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
                //dto.setBuildId(request.getBuildId());
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




                //do with domainName
                String domainName ="no.domain.com";
                Long groupId = 0L;
                if(request.getEnvType().toLowerCase().equals("uat")){
                    if(appType.getSideType().toLowerCase().equals("web") || appType.getSideType().toLowerCase().equals("website")){
                        domainName = project.getDomainNameUAT();
                        if(StringUtils.isNotBlank(application.getDomainName())){
                            domainName = "uat." + application.getDomainName();
                        }
                    }else if(appType.getSideType().toLowerCase().equals("server")){
                        domainName = project.getGatewayUAT();
                    }
                    groupId = project.getUatGroupId();
                }else if(request.getEnvType().toLowerCase().equals("prod")){
                    if(appType.getSideType().toLowerCase().equals("web") || appType.getSideType().toLowerCase().equals("website")){
                        domainName = project.getDomainName();
                        if(StringUtils.isNotBlank(application.getDomainName())){
                            domainName = application.getDomainName();
                        }

                    }else if(appType.getSideType().toLowerCase().equals("server")){
                        domainName = project.getGateway();
                    }
                    groupId = project.getProdGroupId();
                }
                dto.setDomainName(domainName);
                //register docker image
                String buildName = dto.getReleaseVersion() +  "-" + buildNumber;
                DockerImageModel dockerImage = DockerImageModel.builder().buildName(buildName).name(application.getName()).applicationId(application.getId())
                        .version(dto.getReleaseVersion()).deploymentId(dto.getId()).build();
                dockerImageDao.save(dockerImage);

                //get the target execute point.
                //DeploymentGroupModel point = executePointDao.findById(releaseModel.getApplicationPointId());
                //get the target execute point.

                if(null != releaseModel.getApplicationPointId()){
                    groupId =  releaseModel.getApplicationPointId();
                }

                String targetTopic = "ci/simple/point/pointa/execute";
                //DeploymentGroupModel point = executePointDao.findById(releaseModel.getApplicationPointId());
                DeploymentGroupModel point = executePointDao.findById(groupId);
                dto.setSupportMesh(point.getSupportMesh());
                System.out.println("deploy to topic " + point.getTopicName());
                if(StringUtils.isNotBlank(point.getTopicName())){
                    targetTopic = point.getTopicName();
                }

                mqttService.deployTo(dto, targetTopic,"execute");
                //mqttService.deployTo(dto, executePointTopic, command);

            }


        }catch (Exception e){
            e.printStackTrace();
        }

    }


}