import React from 'react';

import {
    Collapse,
    Radio,
    Steps,
    Divider,
    Button,
} from 'antd';
const { Panel } = Collapse;
const { Step } = Steps;

import router from 'next/router';
import DeploymentModel from './models/DeploymentModel';
import BasePage from '../common/pages/BasePage';

export default class EditPage extends BasePage {
    formRef = React.createRef();
    state = {
        dataObject: [],
        envType: 'ALL',
    }
    constructor(props) {
        super(props);
        this.setDefaultModel(new DeploymentModel());

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
        console.log("current applicationid is " + this.applicationId);

        console.log(" applicationid from params is " + this.params().applicationId);
        if (this.applicationId) {
            this.getDeploymentListByEnvType(this.state.envType);
        }
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
    handleLineDelete(index, record) {
        let id = record.id;
        this.Store().removeById(index, record.id, function (value) {
            console.log('sucessful to detele one xrlease');
        });
    }
    onCreateDeployment = () => {
        let path = '/applicationrelease/add';
        //let applicationId = this.params().applicationId;
        router.push({ pathname: path, query: { applicationId: this.applicationId, envType: this.state.envType } });
    }
    onRelease = (deploymentId, e) => {
        e.stopPropagation();
        console.log(deploymentId);
        let releaseParams = { releaseId: deploymentId, envType: this.state.envType };
        this.Store().deployTo(releaseParams).then(function (result) {
            console.log("have delpoy to");
            console.log(result);
        });


        
    }
    onRemove = (deploymentId, index,e) => {
        let that = this;
        e.stopPropagation();
        console.log(deploymentId);
        
        this.Store().removeById(deploymentId).then(function (result) {
            that.state.dataObject.splice(index,1);
            that.setState({dataObject:that.state.dataObject});
            console.log(result);
        });
        
    }
    
    getDeploymentListByEnvType(envType) {
        let that = this;

        let applicationId = this.applicationId; // this.params().applicationId;
        if (applicationId <= 0) { console.log("无法获取当前所属应用信息"); return; }
        let params = { applicationId: applicationId, envType: envType };
        if (envType == "ALL") {
            this.Store().findAll().then(function (values) {
                if (values.data) {
                    let applications = values.data.list;
                    that.setState({ dataObject: applications, envType: envType });
                } else {

                    that.setState({ dataObject: [], envType: envType });
                }
            });
        } else {
            this.Store().getDeploymentList(params).then(function (values) {
                if (values.data) {
                    let applications = values.data.list;
                    that.setState({ dataObject: applications, envType: envType });
                } else {

                    that.setState({ dataObject: [], envType: envType });
                }

            });
        }
    }
    onChange = e => {
        let that = this;
        e.stopPropagation();
        let envType = e.target.value;
        console.log(envType)
        this.getDeploymentListByEnvType(envType);
    };
    render() {
        let that = this;
        let envType = this.state.envType;
        let items = that.StoreData();
        console.log('render module edit page');
        return (
            < div >
                <Radio.Group value={envType} onChange={that.onChange} style={{ marginBottom: 16 }}>
                    <Radio.Button value="ALL">镜像定制发布</Radio.Button>
                    <Radio.Button value="FAT">FAT</Radio.Button>
                    <Radio.Button value="UAT">UAT</Radio.Button>
                    <Radio.Button value="PROD">PROD</Radio.Button>
                </Radio.Group>
                <Divider />
                <Button type="primary" size="large" onClick={that.onCreateDeployment} >创建发布</Button>
                <Divider />

                <Collapse accordion defaultActiveKey={['0']}>
                    {items.map(function (record, index) {
                        let supportAutoDeploy = record.autoDeploy >0 ? "YES" : "NO";
                        let headerText = "[发布单编号=>" + record.id + "][版本=>" + record.releaseVersion +  "][支持自动发布=>" + supportAutoDeploy + "]";
                        console.log(record);
                         
                        if ((!record.releaseStatus) || (record.releaseStatus == "waiting")){
                            return (
                                <Panel header={headerText} key={index} extra={<>
                                    <Button type="primary" onClick={that.onRelease.bind(that, record.id)} >UAT=>PROD发布</Button>
                                    <Button type="primary" onClick={that.onRelease.bind(that, record.id)} >全流程发布</Button>
                                    <Button onClick={that.onRemove.bind(that, record.id,index)} >删除</Button>
                                    </>} >
                                </Panel>);
                        }else if (record.releaseStatus == "progress"){
                            return (
                                <Panel header={headerText} key={index} extra={
                                    <Button >发布中....</Button>} >
                                </Panel>);
                        }else if  (record.releaseStatus == "finish"){
                            return (
                                <Panel header={headerText} key={index} extra={
                                    <>
                                    <Button onClick={that.onRelease.bind(that, record.id)} >重新全流程发布</Button>
                                    <Button onClick={that.onRemove.bind(that, record.id,index)} >归档</Button>
                                    </>} >
                                </Panel>);
                        }
                        
                    })}

                </Collapse>


            </div>
        );
    }
}

