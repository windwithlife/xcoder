import React from 'react';

import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';

import BasePage from '../common/pages/BasePage';
import  ApplicationModel from './models/DeploymentConfigModel';

export default class EditPage extends BasePage {
    formRef = React.createRef();
    state = {
        dataObject:{},
    }
    constructor(props) {
        super(props);   
        this.setDefaultModel(new ApplicationModel());     
    }
   
    StoreData=()=>{
        return this.state.dataObject;
    }
    componentDidMount(){
        let that = this;
        //let applicationId = this.params().applicationId;
        //console.log(this.params());
        
       
    }
    onFinish = values => {
        var that = this;
        values.applicationId = this.params().applicationId;
        console.log(values);
        this.Store().add(values, () => { console.log('finished add row'); router.back(); });
    }
   
    render() {
        var that = this;
        return (
            <Card>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>
                   
                    <Form.Item name="repository" label="代码仓库地址">
                        <Input />
                    </Form.Item>
                    <Form.Item name="repositoryBranch" label="代码分支">
                        <Input />
                    </Form.Item>
                    <Form.Item name="targetPath" label="待发布代码路径">
                        <Input />
                    </Form.Item>
                    <Form.Item name="version" label="当前版本">
                        <Select style={{ width: 200 }} >
                            <Option value="V1.0">V1.0</Option>
                            <Option value="V2.0">V2.0</Option>
                        </Select>
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


