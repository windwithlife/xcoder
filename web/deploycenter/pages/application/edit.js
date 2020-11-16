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

import BasePage from '../common/pages/BasePage';
import ApplicationModel from './models/ApplicationModel';
import ApplicationTypeModel from '../applicationtype/models/ApplicationTypeModel';

export default class EditPage extends BasePage {
    formRef = React.createRef();
    state = {
        types: [],
        projects:[],
        data: {},
        showWebDomainName:false
        
    }
    constructor() {
        super();
        this.setDefaultModel(new ApplicationModel());
        this.typeModel = new ApplicationTypeModel();
    }

    componentDidMount() {
        let that = this;
        let id = this.params().applicationId;

        this.Store().queryById(id, function (values) {
            console.log(values.data);
            that.formRef.current.setFieldsValue(values.data);
        });
        this.typeModel.queryAll().then(function (result) {
            if (result.data) {
                that.setState({ types: result.data.list });
            }
        })
    }

     
    onChangeType = (value) => {
        let that = this;
        this.state.types.map(function (item, index) {
            if (item.id == value) {
                if ((item.sideType === 'web') || (item.sideType === 'website')) {
                    that.setState({ showWebDomainName: true })
                }else{
                    that.setState({ showWebDomainName: false})
                }
            }
        })
    }
    
    onFinish = values => {
        var that = this;
        console.log('**********************updated data===>');
        console.log(values);
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
                            <Form.Item
                                name="projectId"
                                noStyle='true'
                            ></Form.Item>
                            <Form.Item
                                name="deploymentConfigId"
                                noStyle='true'
                            ></Form.Item>

                            <Form.Item name="name" label="名称"
                                rules={[{
                                    required: true,
                                },]}>
                                <Input />
                            </Form.Item>

                            <Form.Item name="description" label="描述">
                                <Input />
                            </Form.Item>

                            <Form.Item name="applicationTypeId" label="应用类型" >
                                <Select onChange={that.onChangeType}>
                                    {that.state.types.map(function (item, i) {
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
                            {that.state.showWebDomainName && < Form.Item name ="domainName" label="所属站点域名">
                                <Input />
                            </Form.Item>}


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

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
