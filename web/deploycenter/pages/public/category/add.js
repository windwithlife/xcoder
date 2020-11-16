import React from 'react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';

import BasePage from '../../common/pages/BasePage';
import CategoryModel from './models/CategoryModel';


export default class AddPage extends BasePage {
    formRef = React.createRef();

    state = {
        data: {},
    }
    StoreData = () => {
        return this.state.data;
    }
    constructor(props) {
        super(props);
        this.setDefaultModel(new CategoryModel());
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
                    <Form.Item name="name" label="名称"
                        rules={[{
                            required: true,
                        },]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="idName" label="识别串">
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="描述">
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


