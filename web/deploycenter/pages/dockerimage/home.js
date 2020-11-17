import React from 'react';

import {
    Collapse,
    Radio,
    Steps,
    Divider,
    Button,
} from 'antd';
const { Panel } = Collapse;


import router from 'next/router';
import Model from './models/DockerImageModel';
import BasePage from '../common/pages/BasePage';

export default class EditPage extends BasePage {
    formRef = React.createRef();
    state = {
        dataObject: [],
        envType: 'ALL',
    }
    constructor(props) {
        super(props);
        this.setDefaultModel(new Model());

    }
    StoreData = () => {
        return this.state.dataObject;
    }


    componentDidMount = () => {
        let that = this;
        this.applicationId = this.params().applicationId;
        if (!this.applicationId) {
            this.applicationId = this.Store().getCurrentApplicationId();
        }
        console.log("application Id is =======>" + this.applicationId);
        this.Store().findImagesByApplicaionId(this.applicationId).then(function(result){
            if(result.data){
                that.setState({dataObject : result.data.list});
            }
        })
        
       
    }


    handleLineUpdate(index, record) {
        let path = '/application/edit';
        router.push({ pathname: path, query: { id: record.id } });

    }
    handleLineDetail(record) {
        let path = '/application/detail';
        console.log(path);
        router.push({ pathname: path, query: { id: record.id } });
    }
    handleLineAdd() {
        let path = '/application/add';
        console.log(path);
        router.push({ pathname: path, query:{applicationId: this.applicationId}});
    }
    handleLineDelete(index, record, e) {
       
        let that = this;
        e.stopPropagation();
        let deploymentId = record.id;
        console.log(deploymentId);
       
        this.Store().removeById(deploymentId).then(function (result) {
            that.state.dataObject.splice(index,1);
            that.setState({dataObject:that.state.dataObject});
            console.log(result);
        });
        
    }
    onCreateDeployment = (record) => {
        let path = '/applicationrelease/add';
        router.push({ pathname: path, query: { applicationId: this.applicationId, imageId: record.id,buildNumber: record.bindNumber,envType: this.state.envType } });
    }
    onRelease = ( e) => {
        e.stopPropagation();
       
        console.log(this.applicationId);
        let releaseParams = { applicationId: this.applicationId, envType: 'IMAGE' };
        this.Store().buildImage(releaseParams).then(function (result) {
            console.log("start to build docker image");
            console.log(result);
        });
        
    }
  
    
    
    render() {
        let that = this;
        let envType = this.state.envType;
        let items = that.StoreData();
        console.log('render module edit page');
        return (
            < div >
              
                <Divider />
                <Button type="primary" size="large" onClick={that.onRelease} >手动构建镜像</Button>
                <Divider />

                <Collapse accordion defaultActiveKey={['0']}>
                    {items.map(function (record, index) {
                        let supportAutoDeploy = record.autoDeploy >0 ? "YES" : "NO";
                        let headerText = "镜像编号=>" + record.id + "][版本=>" + record.releaseVersion +  "][构建号=>" +record.buildName+ "]";
                        console.log(record);
                         
                        if ((!record.releaseStatus) || (record.releaseStatus == "progress")){
                            return (
                                <Panel header={headerText} key={index} extra={<>
                                    <Button type="primary" onClick={that.onCreateDeployment.bind(that, record)} >构建发布</Button>
                                   
                                    <Button onClick={that.handleLineDelete.bind(that, index, record)} >删除</Button>
                                    </>} >
                                </Panel>);
                        }else if  (record.releaseStatus == "finish"){
                            return (
                                <Panel header={headerText} key={index} extra={
                                    <>
                                    <Button onClick={that.onCreateDeployment.bind(that, record)} >构建发布</Button>
                                    <Button onClick={that.handleLineDelete.bind(that,index, record)} >删除</Button>
                                    </>} >
                                </Panel>);
                        }
                        
                    })}

                </Collapse>


            </div>
        );
    }
}

