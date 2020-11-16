import React from 'react';
import {
    Button,
    Collapse,
    Form,
    Card,
    Select,
} from 'antd';
const { Panel } = Collapse;
import router from 'next/router';
import BasePage from '../common/pages/BasePage';
import ApplicationModel from './models/ApplicationModel';




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
    changeEditMode = (event) => {
        event.stopPropagation();
    }


    buildPageColumns() {
        let fieldColumns = [];

        fieldColumns.push({
            title: "模块名称",
            dataIndex: 'name',
            key: 'name'
        });
        fieldColumns.push({
            title: "说明",
            dataIndex: 'description',
            key: 'description'
        });

        return fieldColumns;

    }
    componentDidMount() {
        let that = this;
        let applicationId = this.params().applicationId;
        this.Store().queryById(applicationId, function (values) {
            let applictionObject = values.data;
            console.log(applictionObject);
            that.setState({ dataObject: applictionObject });

        });
    }


    deployTo = () => {
        let applicationId = this.params().applicationId;
        this.Store().setCurrentApplicationId(applicationId);
        router.push({ pathname: '/applicationrelease/deployment-home', query: { applicationId: applicationId } });
    }
    setDeployConfig = () => {
        let applicationId = this.params().applicationId;
        let configId = this.StoreData().deploymentConfigId;
        if (configId) {
            router.push({ pathname: '/deploymentconfig/detail', query: { applicationId: applicationId, deploymentConfigId: configId } });
        } else {
            router.push({ pathname: '/deploymentconfig/add', query: { applicationId: applicationId } });
        }

    }

    handleLineUpdate(type, index, record) {
        let that = this;
        let path = '/' + type + '/edit';
        router.push({ pathname: path, query: { id: record.id, moduleId: this.props.query.moduleId } });

    }
    handleLineDetail(type, record) {
        let path = '/' + type + '/detail';
        console.log(path);
        router.push({ pathname: path, query: { id: record.id } });
    }
    handleLineAdd(type) {
        let applicationId = this.props.query.id;
        if ('xpage' == type) {
            router.push({ pathname: '/xpage/add', query: { applicationId: applicationId } });
        }
    }

    handleLineDelete(type, index, record) {


    }
    onEdit = () => {
        let applicationId = this.params().applicationId;
        router.push({ pathname: '/application/edit', query: { applicationId: applicationId } });
    }
    render() {
        let that = this;
        let editUrl = "/application/edit?id=" + this.params().id;
        let itemData = that.StoreData();
        console.log('render edit page');
        return (
            < div >
                <Card size="small" title="基本信息" style={{ width: 500 }} extra={<a onClick={that.onEdit} >修改应用信息</a>} >
                    <Form ref={this.formRef}>
                        < Form.Item label="名称:">
                            {itemData.name}
                        </Form.Item>
                        < Form.Item label="描述信息：">
                            {itemData.description}
                        </Form.Item>
                        <Form.Item label="应用识别名（英文及数字）">
                            {itemData.applicationName}
                        </Form.Item>
                        <Form.Item label="服务，站点类应用访问PATH">
                            {itemData.path}
                        </Form.Item>
                        < Form.Item label="所属站点域名">
                            {itemData.domainName}
                        </Form.Item>
                        < Form.Item label="应用类型：">
                            {itemData.applicationTypeId}
                        </Form.Item>
                        < Form.Item label="所属项目：">
                            {itemData.projectId}
                        </Form.Item>

                        <Card type="inner">
                            <Form.Item>
                                <Button type="primary" onClick={that.setDeployConfig} size="large">源代码发布设置</Button>
                                <Button type="primary" onClick={that.deployTo} size="large">进行发布</Button>
                            </Form.Item>
                        </Card>

                    </Form>
                </Card>


            </div>
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
