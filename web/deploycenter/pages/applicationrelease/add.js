import React from 'react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import DeploymentModel from './models/DeploymentModel';
import DocerkImageModel from './models/DockerImageModel';
import DeploymentGroupModel from '../applicationpoint/models/DelpoymentGroupModel';
import BasePage from '../common/pages/BasePage';
const {Option} =Select;

export default class AddPage extends BasePage {
    formRef = React.createRef();
    state={
        dataObject:{},
        groups:[],
        dockerImages:[],
        withImage:false,
    }
    StoreData = () => {
        return this.state.dataObject;
    }
    constructor(props) {
        super(props);
        this.setDefaultModel(new DeploymentModel());
        this.groupModel = new DeploymentGroupModel();
        this.imageModel = new DocerkImageModel();
    }

    componentDidMount() {
        let that = this;
        this.applicationId = this.params().applicationId;
        this.buildNumber = this.params().buildNumber;
        this.imageId = this.params().imageId;
        this.envType =this.params().envType;
       
        if(!this.applicationId){
            this.applicationId = this.Store().getCurrentApplicationId();
        }
        this.evnType = this.params().envType;

        if(this.imageId){
            this.withImage = true;
            this.groupModel.findAll().then(function(result){
                let groups = result.data.list;
                console.log(groups);
                that.setState({groups:groups,imageId: that.imageId,buildNumber:that.buildNumber,envType:that.envType});
            });

        }else{
            this.groupModel.findAll().then(function(result){
                let groups = result.data.list;
                console.log(groups);
                that.setState({groups:groups});
            });
            this.imageModel.findAll().then(function(result){
                const defaultImageList = [{id:0, name:"构建最新代码镜像"}];
                console.log([].push(defaultImageList));
                console.log("get imagedocker daata");
                if(result.data){
                    let images = result.data.list;
                    images.push.apply(images,defaultImageList);
                    that.setState({dockerImages:images})
                }else{
                    
                    that.setState({dockerImages:defaultImageList});
                }    
            });
        }

       
       
        
    }
    onFinish = values => {
        var that = this;
        if(!this.applicationId){
           console.log("缺省当前应用信息参数，执行失败");
           return;
        }
        values.applicationId = this.applicationId;
        values.envType = this.params().envType;
        values.imageId = this.imageId;
        values.buildNumber = this.buildNumber;
        console.log("*********************#############release params");
        console.log(values);
        this.Store().add(values, (result) => {
             console.log('finished add row'); 
            let path = '/applicationrelease/deployment-home';
            router.push({ pathname: path, query: { applicationId: that.applicationId, envType: that.params().envType }});
        });
    }

    render() {
        var that = this;

        return (
            <Card>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}
                initialValues={{
                    serviceCount: 1,
                    cpuLimit:1,
                    memSize:'1',
                    diskSize: '10',
                    releaseVersion: 'V1.0',
                    autoDeploy: "0",
                   }}
                >
                   <Form.Item name="dockerImage" label="发布镜像" >
                        {!that.state.imageId && <Select defaultValue={0}>
                            {that.state.dockerImages.map(function (item, i) {
                                return (<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>);
                            })}
                           
                        </Select>}
                        {that.state.imageId && that.buildNumber }
                    </Form.Item>
                    <Form.Item name="applicationPointId" label="目标集群" >
                        <Select >
                            {that.state.groups.map(function (item, i) {
                                return (<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>);
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item name="serviceCount" label="实  例  数">
                        <Select  style={{ width: 200 }} >
                            <Option key="service1" value="1">1</Option>
                            <Option key="service2" value="2">2</Option>
                            <Option key="service3" value="3">3</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="cpuLimit" label="CPU使用">
                        <Select style={{ width: 200 }} >
                            <Option value="0.5">0.5</Option>
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>

                        </Select>
                    </Form.Item>
                    <Form.Item name="memSize" label="内存(MB)">
                        <Select style={{ width: 200 }} >
                            <Option value="1">1G</Option>
                            <Option value="2">2G</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="diskSize" label="磁盘(GB)">
                        <Select  style={{ width: 200 }} >
                            <Option value="10">10G</Option>
                            <Option value="20">12G</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="releaseVersion" label="发布版本">
                        <Select style={{ width: 200 }} >
                            <Option value="V1.0">V1.0</Option>
                            <Option value="V2.0">V2.0</Option>
                        </Select>
                    </Form.Item>
                    {!that.state.imageId &&<Form.Item name="autoDeploy" label="是否支持自动发布部署">
                     <Select  style={{ width: 200 }} >
                            <Option value="0">不支持</Option>
                            <Option value="1">支持</Option>
                        </Select>
                    </Form.Item>}
                    <Card type="inner">
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large">Save</Button>
                        </Form.Item>
                    </Card>
                </Form>
            </Card>
        );
    }
}


