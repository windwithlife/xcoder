import React from 'react';

import {
    Collapse,
    Button,
    Form,
    Input,
    Card,
    Select,
} from 'antd';
const { Panel } = Collapse;

import router from 'next/router';
import { inject, observer } from 'mobx-react';
import XSelect from '../common/components/select';
import BasePage from '../common/pages/BasePage';
import ApplicationTypeModel from './models/ApplicationTypeModel';



@inject('applicationTypesStore')
@observer
export default class EditPage extends BasePage {
    formRef = React.createRef();
    state = {
        types: [],
        data: {},
    }
    constructor() {
        super();
        this.setDefaultModel(new ApplicationTypeModel());

    }

    componentDidMount() {
        let that = this;
        let id = this.params().applicationId;

        this.Store().queryById(id, function (values) {
            console.log(values);
            that.formRef.current.setFieldsValue(values);
        });

    }

    onFinish = values => {
        var that = this;
        this.Store().update(values, () => { console.log('finished update row'); router.back(); });
    }


    render() {
        let that = this;
        return (
            < div >
                <div>
                    <Card size="small" title="模块基本信息" style={{ width: 500 }}  >

                        <Form ref={this.formRef} onFinish={that.onFinish.bind(that)}>
                            <Form.Item
                                name="id"
                                noStyle='true'
                            ></Form.Item>
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



                            <Form.Item >
                                <Button type="primary" htmlType="submit" size="large">保存修改基本信息</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>


            </div >
        );
    }
}
