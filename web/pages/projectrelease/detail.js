import React from 'react';
//import model from './models/model.js';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import {
    Collapse,
    Modal,
    Form,
    Input,
    Card,
    Select,
} from 'antd';
const { Panel } = Collapse;
import { SettingOutlined } from '@ant-design/icons';
const { TextArea } = Input;
import router from 'next/router';
import { inject, observer } from 'mobx-react';
import EditTable from '../common/components/EditableTable';
import NetworkHelper from '../../store/network';
//import AddorEditPage from './AddorEditColumn';


@inject('modulesStore') @inject('releasesStore') @inject('pagesStore') @inject('projectsStore')
@observer
export default class EditPage extends React.Component {
    formRef = React.createRef();
    state = {
        editMode: false,
    }
    constructor() {
        super();
        this.projectName = "tempName";
    }
    Store = () => {
        return this.props.releasesStore;
    }
    changeEditMode = (event) => {
        event.stopPropagation();
        console.log('click on edit model');
        let nextMode = !this.state.editMode;
        this.setState({ editMode: nextMode });
    }
    tableHeader() {
        var that = this;

        var fieldColumns = [];

        fieldColumns.push({
            title: "表的名称",
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
        let id = this.props.query.id;

        this.Store().queryById(id, function (values) {
            console.log(values);
            that.props.projectsStore.queryById(values.projectId, function (value) {
                that.projectName = value.name;
            });
            that.props.modulesStore.queryById(values.moduleId, function (value) {
                //that.projectName = value.name;
            });
            that.formRef.current.setFieldsValue(values);
        });
    }

    generateCode = () => {
        //console.log(type);
        let itemData = this.Store().dataObject.currentItem;
        itemData.projectName = this.projectName;
        itemData.module = this.props.modulesStore.dataObject.currentItem;
        let finalParams = {};
        finalParams.type = 'release';
        finalParams.defines = itemData;

        NetworkHelper.webPost("generateCodeByProjectId/", finalParams);
        console.log(finalParams);
    }
    createDeployment=()=>{
        let applicationId = this.props.query.id;
        router.push({ pathname:'/xrelease/add', query: {applicationId: applicationId} });
    }
    downloadCode = () => {
        //console.log(type);
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
        let releaseId = this.props.query.id;
        console.log('begin route to ' + type);
        if ('xmodule' == type) {
            router.push({ pathname: '/projectrelease/add_module', query: { id: releaseId } });
        } else if ('xpage' == type) {
            router.push({ pathname: '/xpage/add', query: { id: releaseId } });
        }
    }

    handleLineDelete(type, index, record) {
        let that = this;
        let releaseId = this.props.query.id;
        if ('xpage' == type) {
            this.props.pagesStore.removeById(index, record.id, function (value) {
                that.Store().queryById(moduleId);
            });
        }
        if ('xmodule' == type) {
            let moduleId = record.id;
            this.Store().deleteModule(releaseId, moduleId, function (value) {
                console.log('remove module from release ID is:' + value);
            });
        }

    }

    render() {
        let that = this;
        let editUrl = "/projectrelease/edit?id=" + this.props.query.id;
        let itemData = that.Store().dataObject.currentItem;
        let isShowPage = itemData.sideType == 'server' ? false : true;

        console.log('render module edit page');
        return (
            < div >
                <Card size="small" title="基本信息" style={{ width: 500 }}  >
                    <Form ref={this.formRef}>
                        < Form.Item name="name" label="可发布项目名：">
                            {itemData.name}
                        </Form.Item>
                        < Form.Item name="sideType" label="项目端点类型：">
                            {itemData.sideType}
                        </Form.Item>

                        < Form.Item name="language" label="编程语言：">
                            {itemData.language}
                        </Form.Item>
                        < Form.Item name="framework" label="框架：">
                            {itemData.framework}
                        </Form.Item>
                        < Form.Item name="platform" label="操作系统平台：">
                            {itemData.platform}
                        </Form.Item>
                        < Form.Item name="projectId" label="所属项目：">
                            {itemData.projectId}
                        </Form.Item>
                        <Form.Item name="path" label="服务，站点类应用访问PATH">
                            {itemData.path}
                        </Form.Item>
                        < Form.Item name="moduleName" label="关联模块名">
                            {itemData.moduleName}
                        </Form.Item>

                        < Form.Item name="description" label="描述信息：">
                            {itemData.description}
                        </Form.Item>
                        <Card type="inner">
                            <Form.Item>
                                <Button type="primary" onClick={that.generateCode} size="large">生成项目代码</Button>
                                <Button type="primary" onClick={that.downloadCode} size="large">下载项目代码</Button>
                                <Button type="primary" onClick={that.createDeployment} size="large">创建发布单</Button>
                            </Form.Item>
                        </Card>

                    </Form>
                </Card>

                {isShowPage ? <EditTable title="页面：" columns={that.buildPageColumns()} data={itemData.pages}
                    onAdd={that.handleLineAdd.bind(that, 'xpage')}
                    onDelete={that.handleLineDelete.bind(that, 'xpage')}
                    onUpdate={that.handleLineUpdate.bind(that, 'xpage')}
                    onDetail={that.handleLineDetail.bind(that, 'xpage')}
                ></EditTable> : <div></div>}

            </div>
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
