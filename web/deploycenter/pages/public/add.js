import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import XSelect from '../common/components/select';
import BasePage from '../common/pages/BasePage';
import ApplicationTypeModel from './category/models/CategoryModel';
import App from 'next/app';

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
        this.setDefaultModel(new ApplicationTypeModel());
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
                    < Form.Item name="sideType" label="项目类型：">
                        < XSelect category="sideType" />
                    </Form.Item>
                    < Form.Item name="buildCommand" label="构建命令">
                        <Input />
                    </Form.Item>
                    < Form.Item name="deployCommand" label="部署命令">
                        <Input />
                    </Form.Item>
                    < Form.Item name="dockerfile" label="Dockerfile">
                        < XSelect category="os" />
                    </Form.Item>

                    < Form.Item name="needBuildAndInstall" label="是否需编译">
                        < XSelect category="yesno" />
                    </Form.Item>
                    <Form.Item name="needBuildDocker" label="是否需构建DockerImage">
                        < XSelect category="yesno" />
                    </Form.Item>
                    <Form.Item name="needExecuteScript" label="是否需执行脚本">
                        < XSelect category="yesno" />
                    </Form.Item>
                    <Form.Item name="needDeploy" label="是否需构建发布到集群">
                        < XSelect category="yesno" />
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

