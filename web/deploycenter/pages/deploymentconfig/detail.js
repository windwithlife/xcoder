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
import ApplicationModel from './models/DeploymentConfigModel';

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
        let configId = this.params().deploymentConfigId;
        this.Store().queryById(configId, function (values) {
            let dataObject = values.data;
            console.log(dataObject);
            that.setState({ dataObject: dataObject });

        });
    }

    onEdit = () => {
        const editUrl = "/deploymentconfig/edit";
        const configId = this.params().deploymentConfigId;
        router.push({ pathname: editUrl, query: { deploymentConfigId: configId } });
    }
    backToApplication = () => {
        const applicationPath = "/application/detail";
        const applicationId = this.state.dataObject.applicationId;
        router.push({ pathname: applicationPath, query: { applicationId: applicationId } });
    }

    handleLineUpdate(type, index, record) {
        let that = this;
        let path = '/' + type + '/edit';
        router.push({ pathname: path, query: { id: record.id, moduleId: this.props.query.moduleId } });

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


                        <Form.Item label="代码仓库地址">
                            {itemData.repository}
                        </Form.Item>
                        <Form.Item label="代码分支">
                            {itemData.repositoryBranch}
                        </Form.Item>
                        <Form.Item label="待发布代码路径">
                            {itemData.targetPath}
                        </Form.Item>

                        <Form.Item name="version" label="当前版本">
                        {itemData.version}
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
