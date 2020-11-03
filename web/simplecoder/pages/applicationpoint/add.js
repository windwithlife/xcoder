import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import XSelect from '../common/components/select';
const { TextArea } = Input;
//const FormItem = Form.Item;


@inject('applicationPointStore')  @inject('applicationTypesStore')
@observer
export default class AddPage extends React.Component {
    formRef = React.createRef();

    Store = () => {
        return this.props.applicationPointStore;
    }
    StoreData = () => {
        return this.props.applicationPointStore.dataObject;
    }
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let that = this;
        let appId = this.props.query.applicationId;
        console.log('appid' + appId);
        if (appId){
            this.props.applicationPointStore.queryById(appId, function(values){
                console.log(values);
                that.formRef.current.setFieldsValue({ applicationName:values.name,name: values.name,description:values.name, sideType:values.sideType,language: values.language,framework:values.framework,path:values.path });
            });
        }
        this.props.applicationTypesStore.queryAll();
       
    }
    onFinish = values => {
        var that = this;
        //let projectId = this.props.query.projectId;
        values.releaseStatus = "DEV";
        console.log(values);
        this.Store().add(values, () => { console.log('finished add row'); router.back(); });
    }

    render() {
        var that = this;

        return (
            <Card>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>
                    <Form.Item name="name" label="发布单名称"
                        rules={[{
                            required: true,
                        },]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="描述">
                        <Input />
                    </Form.Item>
                    <Form.Item name="serverAddress" label="UAT服务侦听地址与端口">
                        <Input />
                    </Form.Item>
                    <Form.Item name="serverAddressProd" label="生产服务侦听地址与端口">
                        <Input />
                    </Form.Item>
                    <Form.Item name="idString" label="应用端点识别字符串">
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
AddPage.getInitialProps = async function (context) {
    return { query: context.query, path: context.pathname };
}

