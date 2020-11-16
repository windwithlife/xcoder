import React from 'react';
import {
    Button,
    Icon,
    Table,
    Collapse,
    Modal,
    Form,
    Input,
    Card,
    Select,
} from 'antd';
const { Panel } = Collapse;
import router from 'next/router';
import BasePage from '../common/pages/BasePage';
import ApplicationModel from './category/models/CategoryModel';

export default class EditPage extends BasePage {
    formRef = React.createRef();
    state = {
        dataObject: {},
    }
    constructor(props) {
        super(props);
        this.setDefaultModel(new ApplicationModel());
    }

    StoreData = () => {
        return this.state.dataObject;
    }

    componentDidMount() {
        let that = this;
        let id = this.params().id;
        this.Store().queryById(id, function (values) {
            let dataObject = values.data;
            console.log(dataObject);
            that.setState({ dataObject: dataObject });

        });
    }

    onEdit =()=>{
        const editUrl = "/applicationtype/edit";
        const configId = this.params().deploymentConfigId;
        router.push({pathname:editUrl, query:{deploymentConfigId: configId}});
    }
    backToApplication =()=>{
        const applicationPath = "/application/detail";
        const applicationId = this.state.dataObject.applicationId;
        router.push({pathname:applicationPath, query:{applicationId: applicationId}});
    }
    
   

    handleLineDelete(type, index, record) {


    }

    render() {
        let that = this;
        
        let itemData = that.StoreData();
        console.log('render detail page');
        return (
            < div >
                <Card size="small" title="基本信息" style={{ width: 500 }} extra={<a onClick={that.onEdit}>修改</a>} >
                    <Form ref={this.formRef}>
                    <Form.Item name="name" label="名称">
                        {itemData.name}
                    </Form.Item>
                    <Form.Item name="idName" label="识别串">
                    {itemData.idName}
                    </Form.Item>
                    <Form.Item name="description" label="描述">
                    {itemData.description}
                    </Form.Item>
                    < Form.Item name="sideType" label="项目类型：">
                    {itemData.sideType}
                    </Form.Item>
                    < Form.Item name="buildCommand" label="构建命令">
                    {itemData.buildCommand}
                    </Form.Item>
                    < Form.Item name="deployCommand" label="部署命令">
                    {itemData.deployCommand}
                    </Form.Item>
                    < Form.Item name="dockerfile" label="Dockerfile">
                    {itemData.dockerfile}
                    </Form.Item>

                    < Form.Item name="needBuildAndInstall" label="是否需编译">
                    {itemData.needBuildAndInstall}
                    </Form.Item>
                    <Form.Item name="needBuildDocker" label="是否需构建DockerImage">
                    {itemData.needBuildDocker}
                    </Form.Item>
                    <Form.Item name="needExecuteScript" label="是否需执行脚本">
                    {itemData.needExecuteScript}
                    </Form.Item>
                    <Form.Item name="needDeploy" label="是否需构建发布到集群">
                    {itemData.needDeploy}
                    </Form.Item>


                       

                    </Form>
                </Card>
                <Card type="inner">
                        <Form.Item>
                        <Button type="primary" onClick={that.backToApplication} size="large">返回应用</Button>
                        </Form.Item>
                    </Card>

            </div>
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
