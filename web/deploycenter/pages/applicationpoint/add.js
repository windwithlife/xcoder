import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';

import BasePage from '../common/pages/BasePage';
import GroupModel from './models/DelpoymentGroupModel';


export default class EditPage extends BasePage {
    formRef = React.createRef();
    state = {
        editMode: false,
        data:[],
    }
    constructor() {
        super();
        this.setDefaultModel(new GroupModel())
    }
   
    StoreData=()=>{
        return this.state.data;
    }
    componentDidMount() {
        let that = this;
    }
    onFinish = values => {
        var that = this;
        console.log(values);
        this.Store().add(values, () => { console.log('finished add row'); router.back(); });
    }

    render() {
        var that = this;

        return (
            <Card>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>
                    <Form.Item name="name" label="集群名称"
                        rules={[{
                            required: true,
                        },]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="描述">
                        <Input />
                    </Form.Item>
                    <Form.Item name="topicName" label="可访问主题消息">
                        <Input />
                    </Form.Item>
                    <Form.Item name="extraTopics" label="可访其它主题消息">
                        <Input />
                    </Form.Item>
                    <Form.Item name="supportActions" label="支持功能">
                        <Input />
                    </Form.Item>
                    <Form.Item name="supportMesh" label="支持网格服务">
                        <Select>
                            <Select.Option key="k8s" value="k8s" >K8S</Select.Option>
                            <Select.Option key="istio" value="istio" >ISTIO</Select.Option>
                        </Select>
                    </Form.Item>
                    
                    <Form.Item name="serverAddress" label="发布服务侦听地址">
                        <Input />
                    </Form.Item>
                    <Form.Item name="serverPort" label="发布服务侦听端口">
                        <Input />
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


