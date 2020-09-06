import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import XSelect from '../common/components/select';
const { TextArea } = Input;
//const FormItem = Form.Item;


@inject('applicationreleasesStore')  @inject('applicationTypesStore')  @inject('applicationPointStore') 
@observer
export default class AddPage extends React.Component {
    formRef = React.createRef();

    Store = () => {
        return this.props.applicationreleasesStore;
    }
    StoreData = () => {
        return this.props.applicationreleasesStore.dataObject;
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
            this.props.applicationreleasesStore.queryById(appId, function(values){
                console.log(values);
                that.formRef.current.setFieldsValue({ applicationName:values.name,name: values.name,description:values.name, sideType:values.sideType,language: values.language,framework:values.framework,path:values.path });
            });
        }
        this.props.applicationTypesStore.queryAll();
        this.props.applicationPointStore.queryAll();
       
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
                    <Form.Item name="applicationTypeId" label="应用类型" >
                        <Select >
                            {that.props.applicationTypesStore.dataObject.list.map(function (item, i) {
                                return (<Select.Option value={item.id}>{item.name}</Select.Option>);
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item name="applicationPointId" label="发布端点选择" >
                        <Select >
                            {that.props.applicationPointStore.dataObject.list.map(function (item, i) {
                                return (<Select.Option value={item.id}>{item.name}</Select.Option>);
                            })}
                        </Select>
                    </Form.Item>
                    
                    <Form.Item name="applicationName" label="发布应用名称">
                        <Input />
                    </Form.Item>
                    <Form.Item name="domainName" label="发布目标网关或站点域名">
                        <Input />
                    </Form.Item>
                    <Form.Item name="path" label="发布应用PATH">
                        <Input />
                    </Form.Item>
                    <Form.Item name="repository" label="代码仓库地址">
                        <Input />
                    </Form.Item>
                    <Form.Item name="repositoryBranch" label="代码分支">
                        <Input />
                    </Form.Item>
                    <Form.Item name="targetPath" label="待发布代码路径">
                        <Input />
                    </Form.Item>
                    <Form.Item name="releaseVersion" label="发布版本">
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

