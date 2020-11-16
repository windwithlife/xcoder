import React from 'react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import DeploymentModel from './models/DeploymentModel';
import DocerkImageModel from './models/DockerImageModel';
import DeploymentGroupModel from '../applicationpoint/models/DelpoymentGroupModel';
import BasePage from '../common/pages/BasePage';
const { Option } = Select;

export default class AddPage extends BasePage {
    formRef = React.createRef();
    state = {
        dataObject: {},
        groups: [],
        dockerImages: [],
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
        this.id = this.params().id;
        this.evnType = this.params().envType;
        this.Store().queryById(this.id).then(function (values) {
            that.setState({dataObject:values.data});
        })
        this.groupModel.findAll().then(function (result) {
            let groups = result.data.list;
            console.log(groups);
            that.setState({ groups: groups })
        });
        this.imageModel.findAll().then(function (result) {
            const defaultImageList = [{ id: 0, name: "构建最新代码镜像" }];
            console.log([].push(defaultImageList));
            console.log("get imagedocker daata");
            if (result.data) {
                let images = result.data.list;
                images.push.apply(images, defaultImageList);
                that.setState({ dockerImages: images })
            } else {

                that.setState({ dockerImages: defaultImageList });
            }
        });

    }
    
    render() {
        var that = this;
        let itemData = that.state.dataObject;
        return (
            <Card>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>
                    <Form.Item
                        name="id"
                        noStyle='true'
                    ></Form.Item>
                    <Form.Item name="dockerImage" label="发布镜像" >
                    {itemData.dockerImage}
                    </Form.Item>
                    <Form.Item name="applicationPointId" label="目标集群" >
                    {itemData.applicationPointId}
                    </Form.Item>
                    <Form.Item name="serviceCount" label="实  例  数">
                    {itemData.serviceCount}
                    </Form.Item>
                    <Form.Item name="cpuLimit" label="CPU使用">
                    {itemData.cpuLimit}
                    </Form.Item>
                    <Form.Item name="memSize" label="内存(MB)">
                    {itemData.memSize}GB
                    </Form.Item>
                    <Form.Item name="diskSize" label="磁盘(GB)">
                    {itemData.diskSize}GB
                    </Form.Item>
                    <Form.Item name="releaseVersion" label="发布版本">
                    {itemData.releaseVersion}
                    </Form.Item>

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


