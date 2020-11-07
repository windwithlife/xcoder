import React from 'react';

import {
    Collapse,
    Modal,
    Button,
    Form,
    Input,
    Card,
    Select,
    Steps,
    Divider
} from 'antd';
const { Step } = Steps;
const { Panel } = Collapse;
import DeploySteps from './steps'

import { inject, observer } from 'mobx-react';
import Utils from '../../utils/utils';
import { Network } from '../../store/Network';
import MQTTClient from '../../store/mqtt-client';

let mqttClient = new MQTTClient();
const network = new Network("simple/deployment/");
network.switchWebServerHost('localhost:8888');


@inject('applicationreleasesStore') @inject('applicationTypesStore') @inject('applicationPointStore') @inject('buildRecordStore')
@observer
export default class EditPage extends React.Component {
    formRef = React.createRef();
    state = {
        editMode: false,

    }
    constructor() {
        super();
        this.projectName = "tempName";
        this.deploymentId = 0;
        this.buildRecord = {};

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


    componentDidMount() {
        let that = this;
        let id = this.props.query.id;
        this.deploymentId = 0;
        this.Store().queryById(id, function (values) {
            console.log(values);
            that.props.applicationTypesStore.queryById(values.applicationTypeId);
            that.props.applicationPointStore.queryById(values.applicationPointId);
            if (!values.releaseStatus) {
                values.releaseStatus = "DEV";
            }
        });
        this.props.buildRecordStore.queryByApplicationReleaseId(id, function (result) {
            console.log("Build Record of current release");
            console.log(result);
        });
        mqttClient.setSubscribe('ci/simple/center/frontend/#', function (topic, data) {
            console.log(data);
            const action = topic.substring('ci/simple/center/frontend/'.length, topic.length - 1);
            if (action.startsWith('status/')) {
                let buildId = data.id;
                let releaseStatus = data.status;
                that.props.buildRecordStore.dataObject.list.forEach(function (item) {
                    if (item.id == buildId) {
                        item.releaseStatus = releaseStatus;

                    }
                });
            }


            that.props.buildRecordStore.dataObject.list = that.props.buildRecordStore.dataObject.list.slice();

        });
    }

    traceCurrentBuildRecord = (recordId) => {
        this.props.buildRecordStore.queryById(recordId, function (result) {
            console.log(result);
        });
    }
    createNewDeployment = () => {
        console.log("start to new release.....");
        let releaseParams = { releaseId: this.deploymentId, envType: "BUILD" };
        network.fetch_post("mqtt/deploy", releaseParams).then(function (result) {
            console.log(result);
        })

    }
    releaseTo = (envType) => {
        console.log("start to relerase.....", envType);

        let releaseParams = { releaseId: this.deploymentId, envType: envType };
        network.fetch_post("mqtt/deploy", releaseParams).then(function (result) {
            console.log(result);
        })

        return;



        if ("UAT" === envType) {
            itemData.releaseType = 'uat';

            let values = {
                name: itemData.applicationName, applicationReleaseId: itemData.id, releaseVersion: itemData.releaseVersion, releaseType: envType,
                releaseStatus: "pending", buildNumber: Utils.getNowDateString()
            };
            this.props.buildRecordStore.add(values, (result) => {
                console.log('finished result:');
                console.log(result);
                //itemData.domainName = "uat." + itemData.domainName;
                if (!itemData.domainNameUAT) {
                    itemData.domainNameUAT = 'uat.' + itemData.domainName;
                }
                itemData.domainName = itemData.domainNameUAT;
                itemData.buildId = result.id;
                finalParams.buildRecord = result;
                let releaseParams = { releaseId: applicationReleaseId, envType: envType };
                mqttClient.sendMsg("ci/simple/center/server/test", { command: "release", params: releaseParams });



            });
        } else if ("PROD" === envType) {
            itemData.releaseType = 'prod';
            let values = {
                name: itemData.applicationName, applicationReleaseId: itemData.id, releaseVersion: itemData.releaseVersion, releaseType: envType,
                releaseStatus: "pending", buildNumber: Utils.getNowDateString()
            };
            this.props.buildRecordStore.add(values, (result) => {
                console.log('finished result:');
                console.log(result);
                //itemData.domainName = itemData.domainName;
                itemData.buildId = result.id;
                finalParams.buildRecord = result;



                let releaseParams = { releaseId: applicationReleaseId, buildId: result.id, envType: envType };
                mqttClient.sendMsg("ci/simple/center/server/test", { command: "release", params: releaseParams });

            });
        } else if ("BACK" === envType) {
            //appPointAddress = "http://" + appPoint.serverAddressProd;
            let releaseParams = { releaseId: applicationReleaseId, buildId: result.id, envType: envType };
            mqttClient.sendMsg("ci/simple/center/server/test", { command: "release", params: releaseParams });
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
        let buildRecords = this.props.buildRecordStore.dataObject.list;
        let itemData = that.Store().dataObject.currentItem;


        let domainName = itemData.domainName + "[UAT:" + itemData.domainNameUAT + "]"

        if (!itemData.releaseStatus) {
            itemData.releaseStatus = "DEV";
        }
        console.log('render at xrelease detail page');
        console.log(buildRecords.slice());

        return (
            < div >
                <Collapse accordion >
                    <Panel header="应用详情" key="1" >
                        <Card size="small" title="基本信息" style={{ width: 800 }}  >
                            <Form ref={this.formRef}>
                                < Form.Item label="发布单名称：">
                                    {itemData.name}
                                </Form.Item>
                                < Form.Item label="应用名称：">
                                    {itemData.applicationName}
                                </Form.Item>
                                < Form.Item label="应用类型：">
                                    {appTypeName}
                                </Form.Item>
                                < Form.Item label="应用端点：">
                                    {appPointName}
                                </Form.Item>
                                < Form.Item label="发布目标网关或网站域名：">
                                    {domainName}
                                </Form.Item>
                                < Form.Item label="服务应用PATH：">
                                    {itemData.path}
                                </Form.Item>

                                <Form.Item label="代码仓库地址">
                                    {itemData.repository}
                                </Form.Item>
                                <Form.Item label="代码分支">
                                    {itemData.repositoryBranch}
                                </Form.Item>
                                <Form.Item label="待发布代码路径">
                                    {itemData.targetPath}
                                </Form.Item>
                                <Form.Item label="待发布版本">
                                    {itemData.releaseVersion}
                                </Form.Item>
                                < Form.Item label="是否用自己的布署文件">
                                    {itemData.useOwnDeploymentFile}
                                </Form.Item>
                                < Form.Item label="描述信息：">
                                    {itemData.description}
                                </Form.Item>


                            </Form>

                        </Card>
                    </Panel>
                </Collapse>
                <Divider />
                <Button type="primary" onClick={that.createNewDeployment.bind(that)} size="large">创建部署</Button>
                <Divider />
                <Collapse accordion defaultActiveKey={['0']}>
                    {buildRecords.map(function (record, index) {
                        let headerText = "发布记录" + index + "  版本:" + record.releaseVersion + " 构建序号:" + record.buildNumber;

                        return (
                            <Panel header={headerText} key={index} extra={
                                <Steps size="small" current={2}>
                                    <Step title="构建" />
                                    <Step title="UAT发布" />
                                    <Step title="生产部署" />
                                </Steps>} >
                                <DeploySteps onDeploy={that.releaseTo}></DeploySteps>
                                {/* <Steps current={1}>
                                    <Step title="构建(镜像)" description="完成" />
                                    <Step title="UAT发布" subTitle="Left 00:00:08" description="开始发布" />
                                    <Step title="生产部署" description="未进行" />
                                </Steps> */}
                            </Panel>);

                    })}

                </Collapse>


            </div>
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
