import React from 'react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import DocerkImageModel from './models/DockerImageModel';

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
        this.setDefaultModel(new DocerkImageModel());
       
    }

    componentDidMount() {
        let that = this;
        this.applicationId = this.params().applicationId;
        this.id = this.params().id;
        this.evnType = this.params().envType;
        this.Store().queryById(this.id).then(function (values) {
            that.setState({dataObject:values.data});
        })
       

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
                    <Form.Item name="autoDeploy" label="是否支持自动发布部署">
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


