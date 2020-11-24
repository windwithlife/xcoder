import React from 'react';
import {
    Form,
    Input,
    Card,
    Button,
    Select,
} from 'antd';

import router from 'next/router';


import ProjectModel from './models/ProjectModel';
import DeploymentGroupModel from '../applicationpoint/models/DelpoymentGroupModel';
import BasePage from '../common/pages/BasePage';



export default class EditPage extends BasePage {
    formRef = React.createRef();
    state = {
        visible: false,
        data: {},
        groups: [],
    }

    constructor() {
        super();
        this.setDefaultModel(new ProjectModel());
        this.groupModel = new DeploymentGroupModel();


    }


    onFooterBack() {
        router.back();
    }
    componentDidMount() {

        let that = this;
        let id = this.params().id;
        console.log("edit id:=" + id);
        this.groupModel.findAll().then(function (result) {
            let groups = result.data.list;
            console.log(groups);
            that.setState({ groups: groups });
            that.Store().queryById(id, function (values) {
                that.formRef.current.setFieldsValue(values.data);
            });
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
                        <Form.Item name="buildGroupId" label="构建镜像集群">
                            <Select >
                                {that.state.groups.map(function (item, i) {
                                    return (<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>);
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item name="uatGroupId" label="UAT集群">
                            <Select >
                                {that.state.groups.map(function (item, i) {
                                    return (<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>);
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item name="prodGroupId" label="生产集群">
                            <Select >
                                {that.state.groups.map(function (item, i) {
                                    return (<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>);
                                })}
                            </Select>
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

