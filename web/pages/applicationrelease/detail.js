import React from 'react';
//import model from './models/model.js';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import {
    Collapse,
    Modal,
    Form,
    Input,
    Card,
    Select,
    
} from 'antd';
const { Panel } = Collapse;
import { SettingOutlined } from '@ant-design/icons';
const { TextArea } = Input;
import router from 'next/router';
import { inject, observer } from 'mobx-react';
import EditTable from '../common/components/EditableTable';
import NetworkHelper from '../../store/network';
import Utils from '../../utils/utils';
//import AddorEditPage from './AddorEditColumn';


@inject('applicationreleasesStore') @inject('applicationTypesStore') @inject('applicationPointStore')@inject('buildRecordStore')
@observer
export default class EditPage extends React.Component {
    formRef = React.createRef();
    state = {
        editMode: false,
    }
    constructor() {
        super();
        this.projectName = "tempName";
    }
    Store = () => {
        return this.props.applicationreleasesStore;
    }
    StoreData = () => {
        return this.props.applicationreleasesStore.dataObject;
    }
    changeEditMode = (event) => {
        event.stopPropagation();
        console.log('click on edit model');
        let nextMode = !this.state.editMode;
        this.setState({ editMode: nextMode });
    }

    tableHeader() {
        var that = this;

        var fieldColumns = [];

        fieldColumns.push({
            title: "名称",
            dataIndex: 'name',
            key: 'name'
        });

        fieldColumns.push({
            title: "版本",
            dataIndex: 'releaseVersion',
            key: 'releaseVersion'
        });
        fieldColumns.push({
            title: "发布环境",
            dataIndex: 'envType',
            key: 'envType'
        });
        fieldColumns.push({
            title: "Build Number",
            dataIndex: 'buildOrder',
            key: 'buildOrder'
        });
        return fieldColumns;
    }

    componentDidMount() {
        let that = this;
        let id = this.props.query.id;

        this.Store().queryById(id, function (values) {
            console.log(values);
            that.props.applicationTypesStore.queryById(values.applicationTypeId);
            that.props.applicationPointStore.queryById(values.applicationPointId);
            if (!values.releaseStatus) {
                values.releaseStatus = "DEV";
            }
        });
        this.props.buildRecordStore.queryByApplicationReleaseId(id, function(result){
            console.log("Build Record of current release");
            console.log(result);
        });
    }

    traceCurrentBuildRecord=(recordId)=>{
        this.props.buildRecordStore.queryById(recordId, function(result){
            console.log(result);
        });
    }
    releaseTo = (envType) => {
        let that = this;
        let appType =   this.props.applicationTypesStore.dataObject.currentItem
        let appPoint =   this.props.applicationPointStore.dataObject.currentItem
        let appPointAddress = "http://" + appPoint.serverAddress;
       
       
        let itemData = this.StoreData().currentItem;
        itemData.projectName = this.projectName;
        itemData.envType = envType;
        itemData.sideType = appType.sideType;
        itemData.language = appType.language;
        itemData.framework = appType.framework;
        itemData.isLib = appType.isLib;
        let finalParams = {};
        finalParams.type = 'release';
        finalParams.defines = itemData;
        //NetworkHelper.switchService("http://www.koudaibook.com:8080");

        if("UAT" === envType){
            
           
            let values = {name: itemData.applicationName, applicationReleaseId:itemData.id,releaseVersion:itemData.releaseVersion,releaseType: envType,
                releaseStatus:"pending", buildNumber: Utils.getNowDateString()};
            this.props.buildRecordStore.add(values, (result) => {
                 console.log('finished result:');
                 console.log(result);
                 itemData.domainName = "uat." + itemData.domainName;
                 itemData.buildId = result.id;
                 finalParams.buildRecord = result;
                 appPointAddress = "http://" + appPoint.serverAddress;
                 NetworkHelper.switchService(appPointAddress);
                 NetworkHelper.webPost("releaseByParams/", finalParams);
                 var interval3=setInterval(function(){
                    that.traceCurrentBuildRecord(result.id);
               },5000);
                 

                 });
        }else if("PROD" === envType){
            
            let values = {name: itemData.applicationName, applicationReleaseId:itemData.id,releaseVersion:itemData.releaseVersion,releaseType: envType,
                releaseStatus:"pending", buildNumber: Utils.getNowDateString()};
            this.props.buildRecordStore.add(values, (result) => {
                 console.log('finished result:');
                 console.log(result);
                 //itemData.domainName = itemData.domainName;
                 itemData.buildId = result.id;
                 finalParams.buildRecord = result;
                 appPointAddress = "http://" + appPoint.serverAddressProd;
                 NetworkHelper.switchService(appPointAddress);
                 NetworkHelper.webPost("releaseByParams/", finalParams);
                 var interval3=setInterval(function(){
                    that.traceCurrentBuildRecord(result.id);
               },5000);
            });
        }else if("BACK" === envType){
            appPointAddress = "http://" + appPoint.serverAddressProd;
        }

        
        //console.log(finalParams);
    }

    changeEditMode = (event) => {
        event.stopPropagation();
        //console.log('click on edit model');
        //let nextMode = !this.state.editMode;
        //this.setState({ editMode: nextMode });
    }
    render() {
        let that = this;
        let appTypeName = this.props.applicationTypesStore.dataObject.currentItem.name;
        let appPointName = this.props.applicationPointStore.dataObject.currentItem.name;
        let buildRecords =  this.props.buildRecordStore.dataObject.list;
        let itemData = that.Store().dataObject.currentItem;
        if (!itemData.releaseStatus) {
            itemData.releaseStatus = "DEV";
        }
        console.log('render at xrelease detail page');

        return (
            < div >
                <Card size="small" title="基本信息" style={{ width: 800 }}  >
                    <Form ref={this.formRef}>
                        < Form.Item name="name" label="发布单名称：">
                            {itemData.name}
                        </Form.Item>
                        < Form.Item name="applicationName" label="应用名称：">
                            {itemData.applicationName}
                        </Form.Item>
                        < Form.Item  label="应用类型：">
                            {appTypeName}
                        </Form.Item>
                        < Form.Item  label="应用端点：">
                            {appPointName}
                        </Form.Item>
                        < Form.Item name="path" label="发布目标网关或网站域名：">
                            {itemData.domainName}
                        </Form.Item>
                        < Form.Item name="path" label="服务应用PATH：">
                            {itemData.path}
                        </Form.Item>
                       
                        <Form.Item name="repository" label="代码仓库地址">
                        {itemData.repository}
                        </Form.Item>
                        <Form.Item name="repositoryBranch" label="代码分支">
                        {itemData.repositoryBranch}
                        </Form.Item>
                        <Form.Item name="targetPath" label="待发布代码路径">
                        {itemData.targetPath}
                        </Form.Item>
                        <Form.Item name="releaseVersion" label="待发布版本">
                        {itemData.releaseVersion}
                        </Form.Item>
                        < Form.Item name="useOwnDeploymentFile" label="是否用自己的布署文件">
                            {itemData.useOwnDeploymentFile}
                        </Form.Item>
                        < Form.Item name="description" label="描述信息：">
                            {itemData.description}
                        </Form.Item>
                        <Card type="inner">
                           
                                <Button type="primary" onClick={that.releaseTo.bind(that, "UAT")} size="large">UAT发布</Button>
                                <Button type="primary" onClick={that.releaseTo.bind(that, "PROD")} size="large">PROD发布</Button>
                                <Button type="primary" onClick={that.releaseTo.bind(that, "BACK")} size="large">PROD回退</Button>
                         
                        </Card>

                    </Form>

                </Card>
                <Collapse  accordion  defaultActiveKey={['1']}>
                    {buildRecords.map(function(record,index){
                        let headerText = "发布记录"+index + "  版本:"+ record.releaseVersion + " 构建序号:"+ record.buildNumber + "  当前状态:" + record.releaseStatus;
                        return  (<Panel header={headerText} key={index}>test</Panel>);
                    })}

                </Collapse>
               

            </div>
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
