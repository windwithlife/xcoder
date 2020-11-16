import React from 'react';
import {
    Modal,
    Form,
    Input,
    Card,
    Button,
} from 'antd';
const { TextArea } = Input;
import router from 'next/router';


import ProjectModel from './models/ProjectModel';
import BasePage from '../common/pages/BasePage';



export default class EditPage extends BasePage {
    formRef = React.createRef();
    state = {
        visible: false,
        data: {},
    }

    constructor() {
        super();
        this.setDefaultModel(new ProjectModel());
        // this.startHeader();

    }


    onFooterBack() {
        router.back();
    }
    componentDidMount() {

        let that = this;
        let id = this.params().id;
        console.log("edit id:=" + id);
        this.Store().queryById(id, function (values) {
            that.formRef.current.setFieldsValue(values.data);
        });
    }

    onFinish = values => {
        var that = this;
        console.log(values);
        this.Store().update(values, () => { console.log('finished add row'); router.back(); });
    }

    render() {
        let that = this;
        return (
            < div >

                <Card size="small" title="项目信息" style={{ width: 600 }}  >
                    <Form ref={this.formRef} onFinish={this.onFinish.bind(that)}>

                        <Form.Item name="id" noStyle='true'></Form.Item>
                        < Form.Item name="name" label="项目名称：">
                            <Input />
                        </Form.Item>
                        < Form.Item name="description" label="描述信息：">
                            <Input />
                        </Form.Item>
                        <Form.Item name="domainName" label="官网域名">
                            <Input />
                        </Form.Item>
                        <Form.Item name="domainNameUAT" label="官网域名(UAT)">
                            <Input />
                        </Form.Item>
                        <Form.Item name="gateway" label="网关">
                            <Input />
                        </Form.Item>
                        <Form.Item name="gatewayUAT" label="网关(UAT)">
                            <Input />
                        </Form.Item>

                        <Form.Item className="form-item-clear" >
                            <Button type="primary" htmlType="submit" size="large">保存信息</Button>
                        </Form.Item>
                    </Form>
                </Card>




            </div>
        );
    }
}

