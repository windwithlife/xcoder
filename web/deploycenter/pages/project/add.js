import React from 'react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';

import ProjectModel from './models/ProjectModel';
import DeploymentGroupModel from '../applicationpoint/models/DelpoymentGroupModel';
import BasePage from '../common/pages/BasePage';



export default class AddPage extends BasePage {
    formRef = React.createRef();
    state = {
        groups: [],
    };
    constructor(props) {
        super(props);

        this.setDefaultModel(new ProjectModel());
        this.groupModel = new DeploymentGroupModel();
    }

    onFinish = values => {
        var that = this;
        this.Store().add(values, () => { console.log('finished add row'); router.back(); });
    }
    componentDidMount() {
        this.groupModel.findAll().then(function (result) {
            let groups = result.data.list;
            console.log(groups);
            that.setState({ groups: groups });
        });
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
                    <Form.Item name="description" label="描述">
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
AddPage.getInitialProps = async function (context) {
    return { query: context.query, path: context.pathname };
}

