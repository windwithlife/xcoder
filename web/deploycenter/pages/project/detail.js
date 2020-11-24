import React from 'react';

import {
    Collapse,
    Button,
    Form,
    Card,

} from 'antd';
const { Panel } = Collapse;
import router from 'next/router';
import EditTable from '../common/components/EditableTable';

import ProjectModel from './models/ProjectModel';
import BasePage from '../common/pages/BasePage';



export default class EditPage extends BasePage {
    formRef = React.createRef();
    state = {
        visible: false,
        data: {},
    }

    constructor() {
        super();
        this.setDefaultModel(new ProjectModel());


    }


    componentDidMount() {
        let that = this;
        let id = this.params().id;
        console.log("edit id:=" + id);

        this.Store().queryById(id).then(function (result) {
            if (result.data) {
                let project = result.data;
                that.setState({ data: project });
            }
        });
    }



    onGotoApplications = () => {
        let pId = this.params().id;
        router.push({ pathname: '/application/home', query: { projectId: pId } });
    }

    onGotoReleases = () => {
        let pId = this.props.query.id;
        router.push({ pathname: '/applicationrelease/home', query: { projectId: pId } });
    }

    onEdit=()=>{
        let projectId = this.params().id;
        router.push({ pathname: '/project/edit', query: { id: projectId} });
    }

    render() {
        let that = this;
        let itemData = this.state.data;
        console.log("render project detail")
        console.log(itemData)
        return (
            < div >

                <Card size="small" title="项目基本信息" style={{ width: 500 }} extra={<a onClick={that.onEdit} >编辑项目基本信息</a>} >


                    <Form >
                        < Form.Item name="name" label="项目名称：">
                            {itemData.name}
                        </Form.Item>
                        < Form.Item name="description" label="描述信息：">
                            {itemData.description}
                        </Form.Item>
                        <Form.Item name="domainName" label="官网域名">
                        {itemData.domainName}
                        </Form.Item>
                        <Form.Item name="domainNameUAT" label="官网域名(UAT)">
                        {itemData.domainNameUAT}
                        </Form.Item>
                        <Form.Item name="gateway" label="网关">
                        {itemData.gateway}
                        </Form.Item>
                        <Form.Item name="gatewayUAT" label="网关(UAT)">
                        {itemData.gatewayUAT}
                        </Form.Item>
                        <Form.Item name="buildGroupId" label="构建镜像集群">
                        {itemData.buildGroupId}
                        </Form.Item>
                        <Form.Item name="uatGroupId" label="UAT集群">
                        {itemData.uatGroupId}
                        </Form.Item>
                        <Form.Item name="prodGroupId" label="生产集群">
                        {itemData.prodGroupId}
                            
                        </Form.Item>


                    </Form>

                    <Card type="inner">
                        <Form.Item>
                            <Button type="primary" onClick={that.onGotoApplications} size="large">项目应用管理</Button>
                        </Form.Item>
                    </Card>
                </Card>



            </div>
        );
    }
}
