import React from 'react';

import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';

import BasePage from '../common/pages/BasePage';
import ApplicationModel from './models/DeploymentConfigModel';

export default class EditPage extends BasePage {
    formRef = React.createRef();
    state = {
        dataObject: {},
    }
    constructor(props) {
        super(props);
        this.setDefaultModel(new ApplicationModel());
    }

    StoreData = () => {
        return this.state.dataObject;
    }
    componentDidMount() {
        const that = this;
        const configId = this.params().deploymentConfigId;
        if (configId) {
            this.Store().queryById(configId).then(function (result) {
                console.log(" get deployment config data");
                console.log(result);
                let values = result.data;
                that.formRef.current.setFieldsValue(values);

            });
        }

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
                    <Form.Item
                        name="id"
                        noStyle='true'
                    ></Form.Item>
                    <Form.Item
                        name="applicationId"
                        noStyle='true'
                    ></Form.Item>

                    <Form.Item name="repository" label="代码仓库地址">
                        <Input />
                    </Form.Item>
                    <Form.Item name="repositoryBranch" label="代码分支">
                        <Input />
                    </Form.Item>
                    <Form.Item name="targetPath" label="待发布代码路径">
                        <Input />
                    </Form.Item>

                    <Card type="inner">
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large">保存修改</Button>
                        </Form.Item>
                    </Card>
                </Form>
            </Card>
        );
    }
}


