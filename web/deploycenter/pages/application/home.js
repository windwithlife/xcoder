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
import {Network} from '../../store/Network';
//import AddorEditPage from './AddorEditColumn';


@inject('applicationsStore') 
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
        return this.props.applicationsStore;
    }
    StoreData=()=>{
        return this.props.applicationsStore.dataObject;
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
            title: "应用类型",
            dataIndex: 'applicationTypeId',
            key: 'sideType'
        });
        fieldColumns.push({
            title: "基于模块",
            dataIndex: 'moduleId',
            key: 'moduleName'
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
        this.Store().queryAll(id, function (values) {
            console.log(values);
        });
    }

    generateCode = () => {
        //console.log(type);
        let itemData = this.Store().dataObject.currentItem;
        itemData.projectName = this.projectName;
        let finalParams = {};
        finalParams.type = 'release';
        finalParams.defines = itemData;

        //NetworkHelper.webPost("generateCodeByProjectId/", finalParams);
        console.log(finalParams);
    }
   

    handleLineUpdate(index, record) {
        
        let path = '/application/edit';
        router.push({ pathname: path, query: { id: record.id } });

    }
    handleLineDetail(record) {
        let path = '/application/detail';
        console.log(path);
        router.push({ pathname: path, query: { id: record.id } });
    }
    handleLineAdd() {
        let path = '/application/add';
        console.log(path);
        router.push({ pathname: path });
    }

    handleLineDelete(index, record) {
        let id = record.id;
        this.Store().removeById(index, record.id, function (value) {
           console.log('sucessful to detele one xrlease');
        });
    }

    render() {
        let that = this;
        let items = that.StoreData().list;
        console.log('render module edit page');
        return (
            < div >
                <Card size="small" title="基本信息" style={{ width: 800 }}  >
                 应用管理首页   
                </Card>
                <EditTable title="当前项目所有可发布应用：" columns={that.tableHeader()} data={items}
                    onAdd={that.handleLineAdd.bind(that)}
                    onDelete={that.handleLineDelete.bind(that)}
                    onUpdate={that.handleLineUpdate.bind(that)}
                    onDetail={that.handleLineDetail.bind(that)}
                ></EditTable>

            </div>
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
