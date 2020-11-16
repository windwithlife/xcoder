import React from 'react';
import { Form, Card,Input,Button,Select} from 'antd';
import router from 'next/router';

import ProjectModel from './models/ProjectModel';
import BasePage from '../common/pages/BasePage';
const { TextArea } = Input;


export default  class AddPage extends BasePage {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {};
        this.setDefaultModel(new ProjectModel());
    }

    onFinish = values => {
        var that = this;
        this.Store().add(values,()=>{console.log('finished add row'); router.back();});
    }
   
render(){
    var that = this;
   
    return (
            <Card>
            <Form  ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>   
                <Form.Item name="name" label="名称"
                    rules={[{
                             required: true,},]}>
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
AddPage.getInitialProps = async function(context){
    return {query:context.query,path:context.pathname};
}

