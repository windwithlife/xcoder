import React from 'react';

import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import BasePage from '../common/pages/BasePage';
import ApplicationModel from './models/ApplicationModel';
import ProjectModel from '../project/models/ProjectModel';
import ApplicationTypeModel from '../applicationtype/models/ApplicationTypeModel';


export default class EditPage extends BasePage {
    formRef = React.createRef();
    state = {
        data: {},
        appTypes: [],
        projects: [],
        showWebDomainName: false,
    }
    constructor(props) {
        super(props);
        this.setDefaultModel(new ApplicationModel());
        this.applicationTypeModel = new ApplicationTypeModel();
        this.projectModel = new ProjectModel();
    }

    StoreData = () => {
        return this.state.data;
    }
    componentDidMount() {
        let that = this;
        this.projectId = this.params().projectId;
        console.log("Test BasePage and params!!!!!!");
        console.log(this.params());
        this.applicationTypeModel.queryAll().then(function (result) {
            if (result.data) {
                let applicationTypes = result.data.list;
                that.setState({ appTypes: applicationTypes });
            }
        });
        this.projectModel.queryAll().then(function (result) {
            if (result.data) {
                let projects = result.data.list;
                that.setState({ projects: projects });
            }
        });

    }
    onFinish = values => {
        var that = this;
        //let projectId = this.params().projectId;
        
        console.log(values);
        this.Store().add(values, () => { console.log('finished add row'); router.back(); });
    }
    
    onChangeType = (value) => {
        let that = this;
        this.state.appTypes.map(function (item, index) {
            if (item.id == value) {
                if ((item.sideType === 'web') || (item.sideType === 'website')) {
                    that.setState({ showWebDomainName: true })
                }else{
                    that.setState({ showWebDomainName: false})
                }
            }
        })
    }
    onChangeProject = (value) => {
        let that = this;
        this.state.projects.map(function (item, index) {
            if (item.id == value) {         
                //that.setState({ showWebDomainName: true })
                that.formRef.current.setFieldsValue({domainName:item.domainName});
            }
        })
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
                    {!this.projectId && (<Form.Item name="projectId" label="所属项目">
                        <Select onChange={that.onChangeProject}>
                            {that.state.projects.map(function (item, i) {
                                return (<Select.Option value={item.id} key={item.id} >{item.name}</Select.Option>);
                            })}
                        </Select>
                    </Form.Item>)

                    }
                    <Form.Item name="applicationTypeId" label="应用类型" >
                        <Select onChange={that.onChangeType}>
                            {that.state.appTypes.map(function (item, i) {
                                return (<Select.Option value={item.id} key={item.id} >{item.name}</Select.Option>);
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item name="applicationName" label="应用识别名（英文及数字）">
                        <Input />
                    </Form.Item>
                    <Form.Item name="path" label="服务，站点类应用访问PATH">
                        <Input />
                    </Form.Item>
                    {that.state.showWebDomainName && (
                        < Form.Item name="domainName" label="所属站点域名">
                            <Input />
                        </Form.Item>)}

                    <Card type="inner">
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large">保存</Button>
                        </Form.Item>
                    </Card>
                </Form>
            </Card>
        );
    }
}


