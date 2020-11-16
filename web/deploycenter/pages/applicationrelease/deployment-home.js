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
                    <Radio.Button value="ALL">全部</Radio.Button>
                    <Radio.Button value="FAT">FAT</Radio.Button>
                    <Radio.Button value="UAT">UAT</Radio.Button>
                    <Radio.Button value="PROD">PROD</Radio.Button>
                </Radio.Group>
                <Divider />
                <Button type="primary" size="large" onClick={that.onCreateDeployment} >创建发布</Button>
                <Divider />

                <Collapse accordion defaultActiveKey={['0']}>
                    {items.map(function (record, index) {
                        let headerText = "[发布单编号=>" + record.id + "][版本=>" + record.releaseVersion +  "][状态=>" + record.releaseStatus + "]";
                        console.log(record);
                         
                        if ((!record.releaseStatus) || (record.releaseStatus == "waiting")){
                            return (
                                <Panel header={headerText} key={index} extra={
                                    <Button type="primary" onClick={that.onRelease.bind(that, record.id)} >发布</Button>} >
                                </Panel>);
                        }else if (record.releaseStatus == "progress"){
                            return (
                                <Panel header={headerText} key={index} extra={
                                    <Button >发布中....</Button>} >
                                </Panel>);
                        }else if  (record.releaseStatus == "finish"){
                            return (
                                <Panel header={headerText} key={index} extra={
                                    <Button onClick={that.onRelease.bind(that, record.id)} >重新發布</Button>} >
                                </Panel>);
                        }
                        
                    })}

                </Collapse>


            </div>
        );
    }
}

