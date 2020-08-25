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


@inject('applicationreleasesStore') @inject('applicationTypesStore')
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
        return this.props.applicationreleasesStore;
    }
    StoreData = () => {
        return this.props.applicationreleasesStore.dataObject;
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
            title: "名称",
            dataIndex: 'name',
            key: 'name'
        });

        fieldColumns.push({
            title: "版本",
            dataIndex: 'releaseVersion',
            key: 'releaseVersion'
        });
        fieldColumns.push({
            title: "发布环境",
            dataIndex: 'envType',
            key: 'envType'
        });
        fieldColumns.push({
            title: "Build Number",
            dataIndex: 'buildOrder',
            key: 'buildOrder'
        });
        return fieldColumns;
    }

    componentDidMount() {
        let that = this;
        let id = this.props.query.id;

        this.Store().queryById(id, function (values) {
            console.log(values);
            that.props.applicationTypesStore.queryById(values.applicationTypeId);
            if (!values.releaseStatus) {
                values.releaseStatus = "DEV";
            }
        });
    }

    releaseTo = (envType) => {
        let appType =   this.props.applicationTypesStore.dataObject.currentItem
        let itemData = this.StoreData().currentItem;
        itemData.projectName = this.projectName;
        itemData.envType = envType;
        itemData.sideType = appType.sideType;
        itemData.language = appType.language;
        itemData.framework = appType.framework;
        let finalParams = {};
        finalParams.type = 'release';
        finalParams.defines = itemData;
        NetworkHelper.switchService("http://localhost:8080");
        NetworkHelper.webPost("releaseByParams/", finalParams);
        console.log(finalParams);
    }

    render() {
        let that = this;
        let appTypeName = this.props.applicationTypesStore.dataObject.currentItem.name;
        let itemData = that.Store().dataObject.currentItem;
        if (!itemData.releaseStatus) {
            itemData.releaseStatus = "DEV";
        }
        console.log('render at xrelease detail page');

        return (
            < div >
                <Card size="small" title="基本信息" style={{ width: 800 }}  >
                    <Form ref={this.formRef}>
                        < Form.Item name="name" label="可发布名：">
                            {itemData.name}
                        </Form.Item>
                        < Form.Item  label="应用类型：">
                            {appTypeName}
                        </Form.Item>
                        < Form.Item name="path" label="服务类应用PATH：">
                            {itemData.path}
                        </Form.Item>
                        < Form.Item name="applicationName" label="应用名称：">
                            {itemData.applicationName}
                        </Form.Item>
                        <Form.Item name="repository" label="代码仓库地址">
                        {itemData.repository}
                        </Form.Item>
                        <Form.Item name="repositoryBranch" label="代码分支">
                        {itemData.repositoryBranch}
                        </Form.Item>
                        <Form.Item name="targetPath" label="待发布代码路径">
                        {itemData.targetPath}
                        </Form.Item>
                        <Form.Item name="releaseVersion" label="待发布版本">
                        {itemData.releaseVersion}
                        </Form.Item>
                        < Form.Item name="releaseStatus" label="当前发布状态：">
                            {itemData.releaseStatus}
                        </Form.Item>
                        < Form.Item name="description" label="描述信息：">
                            {itemData.description}
                        </Form.Item>
                        <Card type="inner">
                            <Form.Item>
                                <Button type="primary" onClick={that.releaseTo.bind(that, "UAT")} size="large">UAT发布</Button>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={that.releaseTo.bind(that, "PROD")} size="large">生产发布</Button>
                            </Form.Item>
                        </Card>

                    </Form>

                </Card>
                {/* <EditTable title="发布历史记录：" columns={that.tableHeader()} data={items}
                    onAdd={that.handleLineAdd.bind(that)}
                    onDelete={that.handleLineDelete.bind(that)}
                    onUpdate={that.handleLineUpdate.bind(that)}
                    onDetail={that.handleLineDetail.bind(that)}
                ></EditTable> */}

            </div>
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
